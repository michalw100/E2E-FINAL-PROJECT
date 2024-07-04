// import { StreamChat } from "stream-chat";

// פונקציה ליצירת צאט חדש
const createChatChannel = async (chatClient, fileId, userId, name) => {
  const chatId = await getChatID(fileId, userId);
  if (chatId) {
    await saveCurrentChat(chatId.id);
  } else {
    const userIds = await getChatMembers(userId);
    const chatMembers = userIds.map(
      (member) => `user-${member.employeeUserID || member.userID}`
    );
    // console.log("chatMembers");
    // console.log(`user-${userId}`);
    chatMembers.push(`user-${userId}`);
    const newChatId = await createChatID(fileId, userId);
    // console.log("newChatId");
    // console.log(newChatId);
    try {
      if (newChatId && userId) {
        const members = chatMembers;
        const channel = chatClient.channel("messaging", `myChat-${newChatId}`, {
          members: members,
          name: name,
          // description: "This is a team chat for project XYZ",
        });
        await channel.create();
        await saveCurrentChat(newChatId);
        return channel.data;
      }
    } catch (error) {
      throw error;
    }
  }
};

const saveCurrentChat = async (chatId) => {
  try {
    const response = await fetch(
      `http://localhost:3000/chat/storeChatIDToSession`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ chatId: chatId }),
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    // console.log("User details saved successfully");
  } catch (error) {
    console.error("Error saving user details:", error.message);
  }
};

const getApiKey = async () => {
  try {
    const data = await fetch(`http://localhost:3000/chat/apiKey`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    // console.log(data);
    if (!data) {
    } else {
      const [apiKey] = await data.json();
      // console.log("apiKey");
      // console.log(apiKey);
      return apiKey;
    }
  } catch (err) {
    throw err;
  }
};

const getChatMembers = async (userId) => {
  let members;
  await fetch(`http://localhost:3000/users/chatMembers?id=${userId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  })
    .then((response) => {
      if (!response.ok) {
      }
      return response.json();
    })
    .then((data) => {
      // const chat = data.json();
      // console.log(data[0]);
      members = data[0];
    });
  return members;
};

const getChatID = async (fileID, userID) => {
  let chat;
  await fetch(
    `http://localhost:3000/chat/chat?fileID=${fileID}&&userID=${userID}`,
    {
      method: "GET",
      credentials: "include",
    }
  )
    .then((response) => {
      if (!response.ok) {
      }
      if (response.status == 204) return false;

      return response.json();
    })
    .then((data) => {
      chat = data;
    });
  return chat;
};

const createChatID = async (fileID, userId) => {
  let chat;
  await fetch(`http://localhost:3000/chat/chat`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ fileID: fileID, userID: userId }),
  })
    .then((response) => {
      if (!response.ok) {
      }
      return response.json();
    })
    .then((data) => {
      chat = data;
      return;
    });
  return chat;
};

// פונקציה לקבלת כל הצ'אטים
const getAllChats = async (chatClient) => {
  try {
    const filters = { members: { $in: [`user-20`] } };
    const sort = { last_message_at: -1 };
    const channels = await chatClient.queryChannels(filters, sort, {});
    return channels;
  } catch (error) {
    console.error("Error getting chats:", error);
    throw error;
  }
};

// פונקציה למחיקת צ'אט
const deleteChat = async (chatClient, channelId) => {
  const channel = chatClient.channel("messaging", channelId);
  await channel.delete();
};

// פונקציה למחיקת כל הצ'אטים
const deleteAllChats = async (chatClient, userId, userToken) => {
  try {
     const channels = await getAllChats(chatClient, `user-21`, userToken);
    console.log(channels);
    for (const channel of channels) {
      await deleteChat(chatClient, channel.id, userToken);
    }
    console.log("All chats deleted successfully");
  } catch (error) {
    console.error("Error deleting chats:", error);
  }
};

const getUnreadMessagesForChat = async (chatsInfo, fileID, userID) => {
  console.log(fileID, userID);
  try {
    if (!chatsInfo || chatsInfo.length === 0) {
      console.log("No chats info available");
      return -1;
    }

    const myChat = await getChatID(fileID, userID);
    // console.log(myChat);
    const chat = chatsInfo.find((chat) => chat.chatId === `myChat-${myChat.id}`);

    if (!chat) {
      console.log(`Chat with id ${myChat.id} not found`);
      return -1;
    }

    console.log(
      `Unread messages for chat ${myChat.id}:`,
      chat.unreadMessagesCount
    );
    return chat.unreadMessagesCount;
  } catch (error) {
    console.error("Error processing messages:", error);
    return -1;
  }
};

const getChatsWithUnreadMessages = async (chatsInfo) => {
  if (!chatsInfo || chatsInfo.length === 0) {
    console.log("No chats info available");
    return 0;
  }

  const chatsWithUnread = chatsInfo.filter(
    (chat) => chat.unreadMessagesCount > 0
  );
  const count = chatsWithUnread.length;

  console.log("Number of chats with unread messages:", count);
  return count;
};

export default {
  createChatChannel,
  getApiKey,
  deleteAllChats,
  getUnreadMessagesForChat,
  getChatsWithUnreadMessages,
};
