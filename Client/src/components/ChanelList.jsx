import React from "react";
import { ChannelList, useChatContext } from "stream-chat-react";

const ChannelListContainer = () => {
  const { client } = useChatContext();

  return (
    <ChannelList
    filters={{
      // id: specificChannelID,
      members: { $in: [client.userID] }
    }}
      sort={{ last_message_at: -1 }}
      options={{ subscribe: true, state: true }}
    />
  );
};

export default ChannelListContainer;
