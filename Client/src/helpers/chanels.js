import { StreamChat } from "stream-chat";

// פונקציה ליצירת צאט חדש
const createChatChannel = async (fileId, userId, name) => {
  const chatId = await getChatID(fileId, userId);
  console.log("chatId");
  console.log(chatId);
  if (chatId) {
  } else {
    console.log("new chet");
    const userIds = await getChatMembers(userId);
    const chatMembers = userIds.map(
      (member) => `user-${member.employeeUserID || member.userID}`
    );
    chatMembers.push(`user-${userId}`);
    const apiKey = await getApiKey();
    const client = StreamChat.getInstance(apiKey);
    const newChatId = await createChatID(fileId, userId);
    console.log("chatId");
    console.log(newChatId);
    try {
      if (chatId && userId) {
        await client.connectUser({ id: `user-${userId}` }, userToken);
        const members = chatMembers;
        const channel = client.channel("messaging", `chat-${newChatId}`, {
          members: members,
          name: name,
          // description: "This is a team chat for project XYZ",
        });
        await channel.create();
        return channel.data;
      }
    } catch (error) {
      console.error("Error creating channel:", error);
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
    console.log(data);
    if (!data) {
    } else {
      const [apiKey] = await data.json();
      console.log("apiKey");
      console.log(apiKey);
      return apiKey;
    }
  } catch (err) {
    console.log(err);
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
        console.log(response);
      }
      console.log(response);
      return response.json();
    })
    .then((data) => {
      // const chat = data.json();
      console.log(data[0]);
      members = data[0];
    });
  return members;
};

const getChatID = async (fileID, userID) => {
  let chat;
  await fetch(
    `http://localhost:3000/chat/chat?fileID=${fileID}&?userId=${userID}`,
    {
      method: "GET",
      credentials: "include",
    }
  )
    .then((response) => {
      console.log("response.status");
      console.log(response.status);
      if (!response.ok) {
        console.log("response.status = " + response.status);
        console.log(response);
      }
      if (response.status == 204) return false;

      console.log(response);
      return response.json();
    })
    .then((data) => {
      // const chat = data.json();
      console.log(data);
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
        console.log(response);
      }
      return response.json();
    })
    .then((data) => {
      chat = data;
      return;
    });
  return chat;
};

export default { createChatChannel, getApiKey };
