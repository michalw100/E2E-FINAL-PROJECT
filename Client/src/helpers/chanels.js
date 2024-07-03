import { StreamChat } from "stream-chat";

// פונקציה ליצירת צאט חדש
const createChatChannel = async (chatClient, fileId, userId, name) => {
  const chatId = await getChatID(fileId, userId);
  if (chatId) {
    console.log("chatId");
    console.log(chatId);
  } else {
    const userIds = await getChatMembers(userId);
    const chatMembers = userIds.map(
      (member) => `user-${member.employeeUserID || member.userID}`
    );
    console.log("chatMembers");
    console.log(`user-${userId}`);
    chatMembers.push(`user-${userId}`);
    const newChatId = await createChatID(fileId, userId);
    try {
      if (newChatId && userId) {
        const members = chatMembers;
        const channel = chatClient.channel(
          "messaging",
          `myChats-${newChatId}`,
          {
            members: members,
            name: name,
            // description: "This is a team chat for project XYZ",
          }
        );
        await channel.create();
        return channel.data;
      }
    } catch (error) {
      throw error;
    }
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

const getStreamToken = async (id) => {
  try {
    const data = await fetch(`http://localhost:3000/users/user?id=${id}`, {
      method: "GET",
      credentials: "include",
    });
    const user = await data.json();
    return user.streamToken;
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
        // console.log(response);
      }
      // console.log(response);
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
  console.log(fileID, userID);
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
    body: JSON.stringify({ fileID: fileID, userId: userId }),
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
const getAllChats = async (chatClient, userID) => {
  try {
    const filters = { members: { $in: [`user-4`] } };
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
    console.log("channels");
    // await chatClient.updateUser({ id: `user-20`, role: 'admin' });
    // const response = await chatClient.queryUsers({ id: `user-20` });
    // const user = response.users[0];
    // console.log("User roles:", user); // תדפיס את התפקידים של המשתמש

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

const getChatStats = async (chatClient, userId) => {
  try {
    // שליפה של כל הצ'אטים בהם המשתמש חבר
    const filters = { members: { $in: [`user-${userId}`] } };
    const sort = { last_message_at: -1 };
    const channels = await chatClient.queryChannels(filters, sort, {});

    const chatStats = [];

    for (const channel of channels) {
      const messages = await channel.query({
        messages: { limit: 500 },
      });

      const userMessagesCount = messages.messages.filter(
        (message) => message.user.id === `user-${userId}`
      ).length;

      const otherMessagesCount = messages.messages.filter(
        (message) => message.user.id !== `user-${userId}`
      ).length;

      const unreadMessagesCount = channel.state.unreadCount;

      const totalMessagesCount = userMessagesCount + otherMessagesCount;

      chatStats.push({
        chatName: channel.data.name,
        userMessagesCount: userMessagesCount,
        otherMessagesCount: otherMessagesCount,
        unreadMessagesCount: unreadMessagesCount,
        totalMessagesCount: totalMessagesCount,
      });
    }

    return chatStats;
  } catch (error) {
    console.error("Error getting chat stats:", error);
    throw error;
  }
};

export default { createChatChannel, getApiKey, deleteAllChats, getChatStats };
