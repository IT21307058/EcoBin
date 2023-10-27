import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { db } from "../../../config";
import { ref, onValue } from "firebase/database";
import { Card } from "react-native-elements/dist/card/Card";
import color from "../../styles/color";

const WishEvents = () => {
  const [WishEvents, setWishEvents] = useState([]);

  useEffect(() => {
    const wishRef = ref(db, "wish"); // Assuming "wish" is the node where your wish data is stored
    onValue(wishRef, (snapshot) => {
      const dataFromDB = snapshot.val();
      if (dataFromDB) {
        const wishArray = Object.values(dataFromDB);
        setWishEvents(wishArray);
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wish List</Text>
      <FlatList
        data={WishEvents}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
            <Card style={styles.Card}>
          <View style={styles.item}>
            <Text style={styles.title}>{item.eventName}</Text>
            <Text style={styles.body}>{item.location}</Text>
                <Text style={styles.body}>{item.organization}</Text>
                <Text style={styles.body}>{item.date}</Text>
                <Text style={styles.body}>{item.time}</Text>
            {/* Display other wish details here */}
          </View>
          </Card>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  item: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  itemText: {
    fontSize: 16,
  },
  Card: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: color.themeColor,
  },
  body: {
    fontSize: 15,
    marginTop: 8,
    color: color.blackOpacity80,
  },
});

export default WishEvents;
