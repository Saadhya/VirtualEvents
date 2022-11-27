import { View, Text } from "react-native";
import React, { useContext } from "react";
import { ChatContext, usechatContext } from "../../context/ChatContext";
import { ChannelList } from "stream-chat-expo";
import { StreamChat } from "stream-chat";
import { useNavigation } from "@react-navigation/core";

const ChatsScreen = () => {
  // const { username } = useContext(ChatContext);
//   const { username } = usechatContext();
    const { setCurrentChannel } = usechatContext();
    const navigation = useNavigation();
  const onSelect = (channel: Channel) => {
    // console.warn("Select");
    setCurrentChannel(channel)
    navigation.navigate("ChatRoom");
  };
  return (
    <ChannelList onSelect={onSelect} />
    // <View>
    //   <Text>{username}</Text>
    // </View>
  );
};
export default ChatsScreen;
