import { StreamChat } from "stream-chat";

// פונקציה ליצירת צאט חדש
const createChatChannel = async (fileId, userId, name) => {
  const apiKey = await getApiKey();
  // const client = StreamChat.getInstance(apiKey);
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
  const userIds = await getChatMembers(userId);
  const chatMembers = userIds.map(member => `user-${member.employeeUserID || member.userID}`);

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

export default { createChatChannel, getApiKey };
