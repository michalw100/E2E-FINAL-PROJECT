import { StreamChat } from "stream-chat";

// פונקציה ליצירת צאט חדש
const createChatChannel = async ({ fileId, userId, name }) => {
  const apiKey = await getApiKey();
  // const client = StreamChat.getInstance(apiKey);
  // let chat = null;
  // await fetch(`http://localhost:3000/chat`, {
  //   method: "post",
  //   headers: { "Content-Type": "application/json" },
  //   credentials: "include",
  //   body: JSON.stringify({ name: name }),
  // })
  //   .then((response) => {
  //     if (!response.ok) {
  //       console.log(response);
  //     }
  //     return response;
  //   })
  //   .then((data) => {
  //     chat = data;
  //     return;
  //   });
  // const chatId = await chat.json();
  const chatMembers = await chatMembers(userId);

  console.log("chatMembers");
  console.log(chatMembers);
  // try {
  //   if (chatId && userId) {
  //     await client.connectUser({ id: `user-${userId}` }, userToken);
  //     const members = [
  //       `user-20`,
  //       `user-18`,
  //       `user-4`,
  //       `user-5`,
  //     ];
  //     const channel = client.channel("messaging", `chat-${chatId}`, {
  //       members: members,
  //       name: "new Group Chat",
  //       // description: "This is a team chat for project XYZ",
  //     });

  //     await channel.create();
  //     return channel.data;
  //   }
  // } catch (error) {
  //   console.error("Error creating channel:", error);
  //   throw error;
  // }
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

const getChatMwmbers = async (userId) => {
  await fetch(`http://localhost:3000/users/chatMembers?id=${userId}`, {
    method: "GET",
    // headers: { "Content-Type": "application/json" },
    credentials: "include",
  })
    .then((response) => {
      if (!response.ok) {
        console.log(response);
      }
      return response;
    })
    .then((data) => {
      chat = data;
      return;
    });
  const chatMembers = await chat.json();
  return chatMembers;
};

export default { createChatChannel, getApiKey };
