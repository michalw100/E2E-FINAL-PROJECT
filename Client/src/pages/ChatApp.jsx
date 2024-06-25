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
  const chatClient = StreamChat.getInstance(apiKey);
  console.log("chatClient")
  console.log(chatClient)
  const { user } = useContext(AuthContext);

  useEffect(() => {
    return () => {
      console.log("disconnecting");
      chatClient.disconnectUser();
    };
  }, []);
  
  useEffect(() => {
    if (user.id) {
      const userId = `user-${user.id}`;
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

      setupClient();
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
