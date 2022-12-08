import { AntDesign } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import {
  Platform,
  StyleSheet,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Text, View } from "../components/Themed";

// data
// import event from "../assets/data/event.json";
// import users from "../assets/data/users.json";
import CustomButton from "../components/CustomButton";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useUserId } from "@nhost/react";
import { useChatContext } from "../context/ChatContext";

const GetEvent = gql`
  query GetEvent($id: uuid!) {
    Event_by_pk(id: $id) {
      id
      name
      date
      EventAttendee {
        user {
          id
          displayName
          avatarUrl
        }
      }
    }
  }
`;
const JoinEvent = gql`
  mutation InsertEventAttendee($eventId: uuid!, $userId: uuid!) {
    insert_EventAttendee(objects: [{ eventId: $eventId, userId: $userId }]) {
      returning {
        id
        userId
        eventId
        Event {
          id
          EventAttendee {
            id
          }
        }
      }
    }
  }
`;
export default function ModalScreen({ route }) {
  const id = route?.params?.id;
  const userId = useUserId();
  const { joinEventChatRoom } = useChatContext();
  // we get data from useQuery
  const { data, loading, error } = useQuery(GetEvent, { variables: { id } });
  // we update data from useMutation
  const [doJoinEvent] = useMutation(JoinEvent);
  const event = data?.Event_by_pk;
  // console.log(JSON.stringify(event, null, 2));


  const onJoin = async () => {
    try {
      await doJoinEvent({ variables: { userId: userId, eventId: id } });
    } catch (e) {
      Alert.alert("Failed to join the event", error?.message);
    }
  };
  const displayedUsers = (event?.EventAttendee || [])
    .slice(0, 5)
    .map((attendee) => attendee.user);

  const joined = event?.EventAttendee?.some(
    (attendee) => attendee.user.id == userId
  );
  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Couldn't find the event</Text>
        <Text>{error.message}</Text>
      </View>
    );
  }
  if (loading) {
    return <ActivityIndicator />;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{event.name}</Text>
      <Text style={styles.time}>
        <AntDesign name="calendar" size={24} color="grey" />{" "}
        {new Date(event.date).toDateString()}
      </Text>
      <View style={styles.footer}>
        {/* user avatars */}
        <View style={styles.user}>
          {displayedUsers.map((user, index) => (
            <Image
              source={{ uri: user.avatarUrl }}
              style={[
                styles.userAvatar,
                { transform: [{ translateX: -15 * index }] },
              ]}
              key={index}
            />
          ))}
          <View
            style={[
              styles.userAvatar,
              { transform: [{ translateX: -15 * displayedUsers.length }] },
            ]}
          >
            <Text>+{event?.EventAttendee?.length - displayedUsers.length}</Text>
          </View>
        </View>
        {!joined ? (
          <CustomButton text="Join the event" onPress={onJoin} />
        ) : (
          <CustomButton
            text="Join the conversation"
            type="SECONDARY"
            onPress={() => joinEventChatRoom(event)}
          />
        )}
      </View>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  },
  time: {
    fontSize: 20,
  },
  footer: {
    marginTop: "auto",
  },
  user: {
    flexDirection: "row",
  },
  userAvatar: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    margin: 2,
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "grey",
    justifyContent: "center",
    alignItems: "center",
  },
});
