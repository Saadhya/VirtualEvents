// import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { useChatContext } from "../../context/ChatContext";
import { Channel, MessageList, MessageInput } from "stream-chat-expo";
import { useNavigation } from "@react-navigation/native";

const ChatRoomScreen = () => {
  const { currentChannel } = useChatContext();
  console.log(JSON.stringify(currentChannel, null, 2));
  
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({ title: currentChannel?.data?.name || "Channel" });
  }, [currentChannel?.data?.name]);

  return (
    <Channel channel={currentChannel}>
      <MessageList />
      <MessageInput />
    </Channel>
  );
};
export default ChatRoomScreen;
