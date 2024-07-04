import React from "react";
import { ChannelList, useChatContext, ChannelPreviewMessenger } from "stream-chat-react";

const ChannelListContainer = ({ setActiveChannel }) => {
  const { client } = useChatContext();

  const onChannelSelect = () => {
    setActiveChannel(true);
  };

  const CustomChannelPreview = (props) => {
    const { channel } = props;
    return (
      <div id={channel.id} onClick={onChannelSelect}>
        <ChannelPreviewMessenger {...props} />
      </div>
    );
  };

  return (
    <ChannelList
      filters={{
        members: { $in: [client.userID] }
      }}
      sort={{ last_message_at: -1 }}
      options={{ subscribe: true, state: true }}
      Preview={CustomChannelPreview}
    />
  );
};

export default ChannelListContainer;
