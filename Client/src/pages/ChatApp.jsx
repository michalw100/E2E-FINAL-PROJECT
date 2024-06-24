import React from 'react';
import { Chat, Channel, ChannelHeader, Thread, Window } from 'stream-chat-react';
import { StreamChat } from 'stream-chat';
import 'stream-chat-react/dist/css/index.css';
import ChannelListContainer from '../components/ChanelList';
import ChannelMessages from '../components/Messages';
require("dotenv").config();


const apiKey = process.env.STREAM_API_KEY;
const chatClient = StreamChat.getInstance(apiKey);

const ChatApp = ({ userId, userToken }) => {
  const [clientReady, setClientReady] = useState(false);

  useEffect(() => {
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
  }, [userId, userToken]);

  if (!clientReady) return <div>Loading...</div>;

  return (
    <Chat client={chatClient} theme='messaging light'>
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
