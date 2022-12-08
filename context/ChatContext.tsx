import { useUserData } from "@nhost/react";
import React, { createContext, useContext, useEffect, useState } from "react";
import { StreamChat, Channel } from "stream-chat";
import { ActivityIndicator, Text } from "react-native";
import { OverlayProvider, Chat } from "stream-chat-expo";
import { useNavigation } from "@react-navigation/native";

type ChatContextType = {
  currentChannel?: Channel;
};

export const ChatContext = createContext<ChatContextType>({
  currentChannel: undefined,
});

const ChatContextProvider = ({ children }: { children: React.ReactNode }) => {
  //component
  const [chatClient, setChatClient] = useState<StreamChat>();
  const [currentChannel, setCurrentChannel] = useState<Channel>();
  const user = useUserData();
  const navigation = useNavigation();

  useEffect(() => {
    const initChat = async () => {
      if (!user) {
        return;
      }
      //   console.log("user: ", user);
      // get info about authenticated
      const client = StreamChat.getInstance("ma2wyrw69x3g");

      // connect the user
      await client.connectUser(
        {
          id: user.id,
          name: user.displayName,
          image: user.avatarUrl,
        },
        client.devToken(user.id)
      );
      setChatClient(client);
      //   console.log("Client output: ", client);

      const globalChannel = client.channel("livestream", "global", {
        name: "notJust.dev",
        // image: "https://getstream.io/random_svg/?name=John",
      });
      await globalChannel.watch();
    };

    initChat();
  }, []);
  useEffect(() => {
    return () => {
      if (chatClient) {
        chatClient.disconnectUser();
      }
    };
  }, []);

  const startDMChatRoom = async (chatWithUser) => {
    if (!chatClient) {
      // <ActivityIndicator />;
      return;
    }
    const newChannel = chatClient?.channel("messaging", {
      members: [chatClient.userID, chatWithUser.id],
    });

    await newChannel.watch();
    setCurrentChannel(newChannel);
    
    // navigation.goBack();
    navigation.replace("ChatRoom");
    // console.warn("Starting a chatroom with a user", user.id);
  };
  
  const joinEventChatRoom = async (event) => {
    if (!chatClient) {
      return;
    }
    const channelId = `room-${event.id}`;
    const eventChannel = chatClient.channel("livestream", channelId, {
      name: event.name,
    });

    await eventChannel.watch({ watchers: { limit: 100 } });
    setCurrentChannel(eventChannel);

    navigation.navigate("Root", {
      screen: "Chat",
    });
    navigation.navigate("Root", {
      screen: "Chat",
      params: { screen: "ChatRoom" },
    });
  };
  if (!chatClient) {
    return <ActivityIndicator />;
  }
  //   const value = { username: "Krishna" };
  const value = {
    chatClient,
    currentChannel,
    setCurrentChannel,
    startDMChatRoom,
    joinEventChatRoom
  };
  return (
    // <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
    <OverlayProvider>
      <Chat client={chatClient}>
        <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
      </Chat>
    </OverlayProvider>
  );
};

export const useChatContext = () => useContext(ChatContext);

export default ChatContextProvider;
