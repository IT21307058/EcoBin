import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { db } from "../../../config";
import { ref, onValue } from "firebase/database";

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
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.eventName}</Text>
            {/* Display other wish details here */}
          </View>
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
});

export default WishEvents;
