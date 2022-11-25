import { Pressable, Alert, StyleSheet } from "react-native";

// import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import {
  Agenda,
  AgendaEntry,
  AgendaSchedule,
  DateData,
} from "react-native-calendars";
import { useState } from "react";
import events from "../assets/data/events.json";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const [items, setItems] = useState<AgendaSchedule>({});

  const loadItems = (day: DateData) => {
    setItems(events);
  };

  const renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  };

  const renderItem = (reservation: AgendaEntry, isFirst: boolean) => {
    const fontSize = isFirst ? 16 : 14;
    const color = isFirst ? "black" : "#43515c";
    return (
      <Pressable
        style={[styles.item, { height: reservation.height }]}
        onPress={() => navigation.navigate("Modal", {id: reservation.id})}
        // onPress={() => Alert.alert(reservation.name)}
      >
        <Text style={{ fontSize, color }}>{reservation.name}</Text>
      </Pressable>
    );
  };
  return (
    // <View style={styles.container}>
    //   <Text style={styles.title}>First</Text>
    //   <View
    //     style={styles.separator}
    //     lightColor="#eee"
    //     darkColor="rgba(255,255,255,0.1)"
    //   />
    //   <EditScreenInfo path="/screens/TabOneScreen.tsx" />
    // </View>
    <View style={styles.container}>
      <Agenda
        items={items}
        selected={"2022-11-25"}
        renderItem={renderItem}
        renderEmptyDate={renderEmptyDate}
        loadItemsForMonth={loadItems}
        // showOnlySelectedDayItems
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
  // title: {
  //   fontSize: 20,
  //   fontWeight: "bold",
  // },
  // separator: {
  //   marginVertical: 30,
  //   height: 1,
  //   width: "80%",
  // },
});
