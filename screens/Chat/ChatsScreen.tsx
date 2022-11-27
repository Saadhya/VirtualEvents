import { View, Text } from "react-native";
import React, { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";

const ChatsScreen = () => {
  const { username } = useContext(ChatContext);

  return (
    <View>
      <Text>{username}</Text>
    </View>
  );
};
export default ChatsScreen;
