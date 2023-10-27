import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, SafeAreaView, Image, TouchableOpacity } from "react-native";
import { db } from "../../../config";
import { ref, onValue } from "firebase/database";
import { Card } from "react-native-elements/dist/card/Card";
import color from "../../styles/color";
import { ImageBackground } from "react-native";
import imagePath from "../../constants/imagePath";
import Btn from "../../Components/Btn";
import BtnRed from "../../Components/BtnRed";
import { remove } from "firebase/database";
import { moderateVerticalScale, moderateScale, scale } from "react-native-size-matters";


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
        <ImageBackground source={imagePath.background} style={styles.imgStyle}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.headerStyle}>
            <Image source={imagePath.backarrow} />
            <Image source={imagePath.bell} />
          </View>
          <Text style={styles.AdvertiseTextStyle}> My Events</Text>
        </SafeAreaView>
      </ImageBackground>

      <FlatList
        data={WishEvents}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
            <Card style={styles.Card}>
          <View style={styles.item}>
          <Text style={styles.title}>{item.eventName}</Text>
                <Text style={styles.body}><Text style={{ fontWeight: "bold" }}>Location :</Text>{item.location}</Text>
                <Text style={styles.body}><Text style={{ fontWeight: "bold" }}>Organization :</Text>{item.organization}</Text>
                <Text style={styles.body}><Text style={{ fontWeight: "bold" }}>Date :</Text>{item.date}</Text>
                <Text style={styles.body}><Text style={{ fontWeight: "bold" }}>Time :</Text>{item.time}</Text>
                <Text style={styles.body}><Text style={{ fontWeight: "bold" }}>Account No :</Text>{item.account}</Text>
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
  Card: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 16,
    marginBottom: 16,
  },

  body: {
    fontSize: 15,
    marginTop: 8,
    color: color.blackOpacity80,
  },
  headerStyle: {
    paddingVertical: moderateVerticalScale(16),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    paddingHorizontal: moderateScale(16),
  },
  container: {
    flex: 1,
  },
  imgStyle: {
    height: 200,
    width: "100%",
  },
  AdvertiseTextStyle: {
    fontSize: scale(25),
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: color.themeColor,
  },
  Card: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 16,
    marginBottom: 16,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  icon: {
    marginHorizontal: 5,
  },
  
});

export default WishEvents;
