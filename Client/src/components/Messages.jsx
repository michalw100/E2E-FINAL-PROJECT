import React, { useEffect, useRef } from 'react';
import { MessageList, MessageInput, useChannelStateContext } from 'stream-chat-react';

const ChannelMessages = () => {
  const { messages } = useChannelStateContext();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div>
      <MessageList />
      <div ref={messagesEndRef} />
      <MessageInput />
    </div>
  );
};

export default ChannelMessages;