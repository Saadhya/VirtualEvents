// import { View, Text } from "react-native";
import React from "react";
import { useChatContext } from "../../context/ChatContext";
import { ChannelList } from "stream-chat-expo";
import { Channel } from "stream-chat";
import { useNavigation } from "@react-navigation/native";

const ChatsScreen = () => {
  // const { username } = useContext(ChatContext);
  const { setCurrentChannel } = useChatContext();
  // console.log(setCurrentChannel.name);
  const navigation = useNavigation();
  const onSelect = (chanel: Channel) => {
    // console.warn("Select");
    setCurrentChannel(chanel);
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
