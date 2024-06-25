import { StreamChat } from "stream-chat";

// פונקציה ליצירת צאט חדש
const createChatChannel = async (apiKey, userId, userToken) => {
  const client = StreamChat.getInstance("k7tfp92tr4he");
  let chat = null;
  await fetch(`http://localhost:3000/chat`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ name: "Group Chat" }),
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
  const chatId = await chat.json();
  try {
    if (chatId && userId) {
      await client.connectUser({ id: `user-${userId}` }, userToken);
      const members = [
        `user-20`,
        `user-18`,
        `user-4`,
        `user-5`,
      ];
      const channel = client.channel("messaging", `chat-${chatId}`, {
        members: members,
        name: "new Group Chat",
        // description: "This is a team chat for project XYZ",
      });

      await channel.create();
      return channel.data;
    }
  } catch (error) {
    console.error("Error creating channel:", error);
    throw error; // יכול להיות שאתה רוצה להטיל את השגיאה הלא הוצלחה
  }
};

export default createChatChannel;
