import { useUserData } from "@nhost/react";
import React, { createContext, useContext, useEffect, useState } from "react";
import { StreamChat, Channel } from "stream-chat";
import { ActivityIndicator } from "react-native";
import { OverlayProvider, Chat } from "stream-chat-expo";
type ChatContextType = {
  currentChannel: Channel;
};

export const ChatContext = createContext<ChatContextType>({
  currentChannel: undefined,
});

const ChatContextProvider = ({ children }: { children: React.ReactNode }) => {
  //component
  const [chatClient, setChatClient] = useState<StreamChat>();
  const [currentChannel, setCurrentChannel] = useState<Channel>();
  const user = useUserData();

  useEffect(() => {
    const initChat = async () => {
      if (!user) {
        return;
      }
      const client = StreamChat.getInstance("ma2wyrw69x3g");
      // get info about authenticated

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
      const globalChannel = client.channel("livestream", "global", {
        name: "notJust.dev",
        // image;''
      });
      await globalChannel.watch();
      //   await globalChannel.watch({ watchers: { limit: 100 } });
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

  const startDMChatRoom = (user)=>{
    console.warn("Starting a chatroom with a user", user.id);
  }
  if (!chatClient) {
    <ActivityIndicator />;
  }
  //   const value = { username: "Krishna" };
  const value = { chatClient, currentChannel, setCurrentChannel };
  return (
    <OverlayProvider>
      <Chat client={chatClient}>
        <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
      </Chat>
    </OverlayProvider>
  );
};

export const usechatContext = () => useContext(ChatContext);
export default ChatContextProvider; 
