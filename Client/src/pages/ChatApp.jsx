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

const ChatApp = ({ apiKey }) => {
  const [clientReady, setClientReady] = useState(false);
  const chatClient = StreamChat.getInstance(apiKey);
  const { user } = useContext(AuthContext);

  const userId = `user-${user.id}`;
  console.log(user.streamToken);
  console.log("user.streamToken");
  const userToken = user.streamToken;
  useEffect(() => {
    if (userToken && userId) {
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

      return () => {
        chatClient.disconnectUser();
      };
    }
  }, [userId, userToken]);

  if (!clientReady) return <div>Loading...</div>;

  return (
    <Chat client={chatClient} theme="messaging light">
      <ChannelListContainer />
      <Channel>
        <Window>
          <ChannelHeader />
          <ChannelMessages />
        </Window>
        <Thread />
      </Channel>
    </Chat>
  );
};

export default ChatApp;
