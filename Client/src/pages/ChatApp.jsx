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

const ChatApp = () => {
  // const [clientReady, setClientReady] = useState(false);
  // const [apiKey, setApiKey] = useState(null);
  // const [chatClient, setChatClient] = useState(null);
  /****************** */

  const { chatClient, clientReady } = useContext(AuthContext);

  // useEffect(() => {
  //   getApiKey();
  //   return () => {
  //     if (clientReady) {
  //       console.log('6666666');
  //       console.log("disconnecting");
  //       chatClient.disconnectUser();
  //     }
  //   };
  // }, []);

  // useEffect(() => {
  //   if (apiKey) {
  //     setChatClient(StreamChat.getInstance(apiKey));
  //     console.log("StreamChat");
  //   }
  // }, [apiKey]);

  // useEffect(() => {
  //   console.log("client trying to ready");
  //   console.log(!clientReady && user.id && apiKey);
  //   if (!clientReady && user.id && apiKey) {
  //     setupClient();
  //   }
  // }, [user, chatClient]);

  // const setupClient = async () => {
  //   const userId = `user-${user.id}`;
  //   const userToken = user.streamToken;
  //   await chatClient.connectUser(
  //     {
  //       id: userId,
  //     },
  //     userToken
  //   );
  //   setClientReady(true);
  // };

  // const getApiKey = async () => {
  //   try {
  //     const data = await fetch(`http://localhost:3000/chat/apiKey`, {
  //       method: "GET",
  //       credentials: "include",
  //     });
  //     console.log(data);
  //     if (!data) {
  //     } else {
  //       const [apiKey] = await data.json();
  //       console.log("apiKey");
  //       console.log(apiKey);
  //       setApiKey(apiKey);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

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
