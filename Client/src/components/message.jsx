import React, { useState, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import WebSocket from 'ws'; // ספריית WebSocket לשימוש ב-React Native

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('ws://your_server_address'); // כתובת השרת שלך

    ws.onopen = () => {
      // console.log('WebSocket connected');
      setSocket(ws);
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, message)
      );
    };

    return () => {
      ws.close();
    };
  }, []);

  const onSend = (newMessages = []) => {
    if (socket) {
      socket.send(JSON.stringify(newMessages[0]));
    }
    setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessages));
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={(newMessages) => onSend(newMessages)}
      user={{ _id: 1 }} // זהות המשתמש הנוכחית
    />
  );
};

export default ChatScreen;