import { StreamChat } from "stream-chat";

// פונקציה ליצירת צאט חדש
const createChatChannel = async (apiKey, userId, userToken) => {
  console.log(apiKey, userId, userToken);
  const client = StreamChat.getInstance("k7tfp92tr4he");
  console.log("apiKey, userId, userToken");

  let chat = null;
  await fetch(`http://localhost:3000/chat`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ name: "Group Chat" }),
  })
    .then((response) => {
      console.log("response");
      console.log(response);

      if (!response.ok) {
        console.log(response);
      }
      return response;
    })
    .then((data) => {
      console.log("filesChanged");
      console.log(data);
      chat = data;
      return;
    });
  console.log("chat");
  const chatId = await chat.json();
  console.log(chatId);
  try {
    console.log(apiKey, userId, chatId);
    if (chatId && userId) {
      // קישור המשתמש לקליינט של Stream
      await client.connectUser({ id: `user-${userId}` }, userToken);
      console.log("chat.id");
      console.log(chat.id);
      const members = [
        `user-20`,
        `user-18`,
        `user-4`,
        `user-5`,
        // `user-${userId}`,
      ];
      // יצירת צאט חדש
      const channel = client.channel("messaging", `chat-${chatId}`, {
        members: members,
        name: "new Group Chat",
        // data: {
        //   type: "team",
        description: "This is a team chat for project XYZ",
        // },
      });

      // שמירת הצאט בשרת
      await channel.create();
      return channel.data;
    }
  } catch (error) {
    console.error("Error creating channel:", error);
    throw error; // יכול להיות שאתה רוצה להטיל את השגיאה הלא הוצלחה
  }
};

export default createChatChannel;
