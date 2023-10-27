import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, SafeAreaView, Image, TouchableOpacity } from "react-native";
import { db } from "../../../config";
import { ref, onValue } from "firebase/database";
import { Card } from "react-native-elements/dist/card/Card";
import color from "../../styles/color";
import { ImageBackground } from "react-native";
import imagePath from "../../constants/imagePath";
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
          <View style={styles.buttonContainer}>
          </View>
          <View style={styles.buttonContainer}>
    </View>
        </SafeAreaView>
      </ImageBackground>

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
//   itemText: {
//     fontSize: 16,
//   },
  Card: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 16,
    marginBottom: 16,
  },
//   title: {
//     fontSize: 22,
//     fontWeight: "bold",
//     color: color.themeColor,
//   },
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
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  AdvertiseTextStyle: {
    fontSize: scale(25),
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
//   headerStyle: {
//     paddingVertical: moderateVerticalScale(16),
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 6 },
//     shadowOpacity: 0.2,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: 16,
//     paddingHorizontal: moderateScale(16),
//   },
//   flatStyle: {
//     backgroundColor: color.white,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     padding: moderateScale(16),
//     borderRadius: moderateScale(4),
//     margin: 2,
//   },
//   flexView: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },
//   AddButton: {
//     width: 50,
//     height: 50,
//     backgroundColor: "#fff",
//     borderRadius: 100,
//     display: "flex",
//     bottom: 0,
//     right: 0,
//     position: "absolute",
//     marginRight: 25,
//     marginBottom: 15,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   AddIconImage: {
//     width: 50,
//     height: 50,
//     // backgroundColor:"#fff",
//     // color:"#fff"
//   },
//   itemContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     borderBottomWidth: 1,
//     borderColor: "#ddd",
//     padding: 10,
//     backgroundColor: "white",
//     borderRadius: 10,
//     padding: 16,
//     marginBottom: 16,
//   },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: color.themeColor,
  },
//   body: {
//     fontSize: 15,
//     marginTop: 8,
//     color: color.blackOpacity80,
//   },
//   searchInput: {
//     width: "80%",
//     height: 40,
//     borderColor: "gray",
//     borderWidth: 1,
//     borderRadius: 5,
//     paddingLeft: 10,
//     fontSize: 16,
//     backgroundColor: "white", // Background color
//     marginBottom: 28,
//     alignSelf: "center",
//   },
//   date: {
//     // marginLeft: 240,
//     color: color.blackOpacity50,
//   },
//   commentcontainer: {},
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
  buttonSpacer: {
    height: 20, // Specify the desired space height
  },
  buttonContainer: {
    position: 'absolute',
    top: 150, // Adjust the top value to position the button
    right: 10, // Move the button to the other side
  },
  myEventsButton: {
    position: "absolute",
    top: 16, // Adjust the top value to position the button
    right: 16, // Adjust the right value to position the button
    backgroundColor: "transparent",
  },
  myEventsButtonText: {
    color: "white",
    fontSize: 18,
  },
});

export default WishEvents;
