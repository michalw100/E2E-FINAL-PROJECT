import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../AuthContext";
import {
  Chat,
  Channel,
  ChannelHeader,
  Thread,
  Window,
} from "stream-chat-react";
import { StreamChat } from "stream-chat";
import "stream-chat-react/dist/css/index.css";
import ChannelListContainer from "../components/ChanelList";
import ChannelMessages from "../components/Messages";
import "../css/chat.css";

const ChatApp = ({ apiKey }) => {
  const [clientReady, setClientReady] = useState(false);
  console.log("apiKey");
  console.log(apiKey);
  const chatClient = StreamChat.getInstance(apiKey);
  console.log("chatClient");
  const { user } = useContext(AuthContext);

  console.log(user.streamToken);
  console.log("user.streamToken");
  useEffect(() => {
    if (user.id) {
      console.log("פעם שמונה מאות");
      const userId = `user-${user.id}`;
      console.log("userId");
      console.log(userId);
      const userToken = user.streamToken;
      const setupClient = async () => {
        await chatClient.connectUser(
          {
            id: userId,
          },
          userToken
        );
        setClientReady(true);
      };
      console.log("שלב ראשון");

      setupClient();
      console.log("שלב שני");

      // return () => {
      //   chatClient.disconnectUser();
      // };
    }
  }, [user]);

  if (!clientReady) return <div>Loading...</div>;

  return (
    <Chat client={chatClient} theme="messaging light">
    <div className="chat-container">
      <div className="channel-list-container">
        <ChannelListContainer />
      </div>
      <div className="channel-container">
        <Channel>
          <div className="window-container">
            <Window>
              <ChannelHeader />
              <ChannelMessages />
            </Window>
          </div>
          <Thread />
        </Channel>
      </div>
    </div>
  </Chat>
  );
};

export default ChatApp;
