import { StreamChat } from "stream-chat";
import axios from "axios"; // אם תצטרך לשלוח בקשות HTTP לשרת

// פונקציה ליצירת צאט חדש
const createChatChannel = async (apiKey, userId, userToken) => {
  console.log(apiKey, userId, userToken)
  // יצירת מופע של הלקוח של Stream
  const client = new StreamChat(
    "k7tfp92tr4he",
    "2svwycsvzuc62baxt5d9nnvwayu3fr7trx6jvegxyamqs5r7fj899mtb3hyrzkad"
  );
  console.log("apiKey, userId, userToken")

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
      // console.log(filesChanged)
      chat = data;
      return;
    });

  try {
    console.log(apiKey, userId, chat.id)

    // קישור המשתמש לקליינט של Stream
    await client.connectUser({ id: `user-${userId}` }, userToken);
    console.log("chat.id");
    console.log(chat.id);
    const members = [
      `user-${20}`,
      `user-${18}`,
      `user-${4}`,
      `user-${5}`,
      `user-${chat.id}`,
    ];
    // יצירת צאט חדש
    const channel = client.channel("messaging", `user-${chat.id}`, {
      members: members,
      name: "Group Chat",
      type: "team",
      data: {
        description: "This is a team chat for project XYZ",
      },
    });

    // שמירת הצאט בשרת
    await channel.create();

    return channel.data;
  } catch (error) {
    console.error("Error creating channel:", error);
    throw error; // יכול להיות שאתה רוצה להטיל את השגיאה הלא הוצלחה
  }
};

export default createChatChannel;
