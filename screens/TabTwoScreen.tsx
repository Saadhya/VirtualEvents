import { StyleSheet, Image } from "react-native";

import { Text, View } from "../components/Themed";
import CustomButton from "../components/CustomButton";
// import users from "../assets/data/users.json";
import { useUserData, useSignOut } from "@nhost/react";

// const user = users[0];

export default function TabTwoScreen() {
  const user = useUserData();
  const {signOut}= useSignOut();

  // console.log(JSON.stringify(user, null));

  return (
    <View style={styles.container}>
      <Image source={{ uri: user?.avatarUrl }} style={styles.avatar} />
      <Text style={styles.name}>{user?.displayName}</Text>
      <View style={{ marginTop: "auto" }}>
        <CustomButton
          onPress={signOut}
          text="Log out"
          type="TERTIARY"
          fgColor="crimson"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  avatar: {
    width: 100,
    aspectRatio: 1,
    borderRadius: 50,
  },
  name: {
    fontWeight: "bold",
    fontSize: 22,
    marginVertical: 15,
    color: "dimgray",
  },
});