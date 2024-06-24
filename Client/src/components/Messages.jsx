import React from 'react';
import { MessageList, MessageInput } from 'stream-chat-react';

const ChannelMessages = () => {
  return (
    <div>
      <MessageList />
      <MessageInput />
    </div>
  );
};

export default ChannelMessages;
