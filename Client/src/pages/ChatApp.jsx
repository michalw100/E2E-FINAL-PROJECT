import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../AuthContext";
import {
  Chat,
  Channel,
  ChannelHeader,
  Thread,
  Window,
} from "stream-chat-react";
import "stream-chat-react/dist/css/index.css";
import ChannelListContainer from "../components/ChanelList";
import ChannelMessages from "../components/Messages";
import "../css/chat.css";
import MyImage from "../pictures/loading-bar.png";

const ChatApp = () => {
  const { chatClient, clientReady } = useContext(AuthContext);
  const [activeChannel, setActiveChannel] = useState(false);
  const initialChannelId = null;

  const clickChannelById = (channelId) => {
    const channelElement = document.getElementById(channelId);
    if (channelElement) {
      channelElement.click();
    }
  };

  useEffect(() => {
    if (clientReady) {
      clickChannelById('2'); // ניתן לשנות ל-ID המבוקש
    }
  }, [clientReady]);

  if (!clientReady)
    return <img className="loading" src={MyImage} alt="Loading..." />;
  
  return (
    <Chat client={chatClient} theme="messaging light">
      <div className="chat-container">
        <div className="channel-list-container">
          <ChannelListContainer setActiveChannel={setActiveChannel} />
        </div>
        <div className="channel-container">
          {activeChannel ? (
            <Channel>
              <div className="window-container">
                <Window>
                  <ChannelHeader />
                  <ChannelMessages />
                </Window>
              </div>
              <Thread />
            </Channel>
          ) : (
            <div>Please select a chat from the list.</div>
          )}
        </div>
      </div>
    </Chat>
  );
};

export default ChatApp;
