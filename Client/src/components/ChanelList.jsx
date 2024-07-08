import React, { useState, useEffect, useCallback } from "react";
import { ChannelList, useChatContext } from "stream-chat-react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ChannelListContainer = () => {
  const { client } = useChatContext();
  const [chatId, setChatId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const { t } = useTranslation();

  const fetchChatId = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "http://localhost:3000/chat/getChatIDFromSession",
        {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (data.chatId) {
        setChatId(`chat-${data.chatId}`);
      } else {
        setChatId(null);
      }
    } catch (error) {
      toasting("error" , "Error fetching chat ID:" + error.message ? error.message : error );
      setChatId(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchChatId();
  }, [fetchChatId, location]); 

  if (isLoading) {
    return <div> {t("Loading...")}</div>;
  }

  const filters = chatId
    ? { id: { $eq: chatId }, members: { $in: [client.userID] } }
    : { members: { $in: [client.userID] } };

  return (
    <ChannelList
      key={`${chatId || "all"}-${location.pathname}`} 
      filters={filters}
      sort={{ last_message_at: -1 }}
      options={{ subscribe: true, state: true }}
    />
  );
};

export default ChannelListContainer;
