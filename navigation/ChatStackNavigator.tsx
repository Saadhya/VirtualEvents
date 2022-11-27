import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChatContextProvider from "../context/ChatContext";
import ChatsRoomScreen from "../screens/Chat/ChatRoomScreen";
import ChatsScreen from "../screens/Chat/ChatsScreen";

const Stack = createNativeStackNavigator();

export default () => {
  return (
    <ChatContextProvider>
      <Stack.Navigator>
        <Stack.Screen name="Chats" component={ChatsScreen} />
        <Stack.Screen name="ChatRoom" component={ChatsRoomScreen} />
      </Stack.Navigator>
    </ChatContextProvider>
  );
};
