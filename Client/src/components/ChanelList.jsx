import React, { useState, useEffect } from "react";
import { ChannelList, useChatContext } from "stream-chat-react";

const ChannelListContainer = () => {
  const { client, clientReady } = useChatContext();
  const [chatId, setChatId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/chat/getChatIDFromSession", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.chatId) {
          setChatId(data.chatId);
        }
      })
      .catch((error) => {
        console.error("Error fetching chat ID:", error);
        setChatId(null);
      });
  }, []);

  useEffect(() => {
    console.log(chatId);
  }, [chatId]);

  return (
    <ChannelList
      filters={{
        id: chatId ? { $eq: `myChat-${chatId}` } : undefined,
        members: { $in: [client.userID] },
      }}
      sort={{ last_message_at: -1 }}
      options={{ subscribe: true, state: true }}
      // Preview={ChannelPreviewMessenger} // Optional: Customize the channel preview component
    />
  );
};

export default ChannelListContainer;
