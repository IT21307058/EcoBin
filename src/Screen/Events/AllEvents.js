import React, { useEffect, useState } from "react";
import {SafeAreaView,View,StyleSheet,Image,TextInput,Alert,Text,TouchableOpacity,FlatList,} from "react-native";
import { ImageBackground } from "react-native";
import { db } from "../../../config";
import { useNavigation } from "@react-navigation/native";
import { onValue } from "firebase/database";
import imagePath from "../../constants/imagePath";
import colors from "../../styles/color";
import {moderateScale,moderateVerticalScale,scale,} from "react-native-size-matters";
import { ref, set, push } from "firebase/database";
import { Card } from "react-native-paper";
import BtnYlw from "../../Components/BtnYlw";
import Btn from "../../Components/Btn";
import Icon from "react-native-vector-icons/FontAwesome";
import { remove } from "firebase/database";
// import DateTimePicker from '@react-native-community/datetimepicker';


const AllEvents = () => {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');


  const navigation = useNavigation();

  useEffect(() => {
    const eventRef = ref(db, "event");
    onValue(eventRef, (snapshot) => {
      const dataFromDB = snapshot.val();
      if (dataFromDB) {
        const eventArray = Object.keys(dataFromDB).map((key) => ({
          id: key,
          ...dataFromDB[key],
        }));
        setEvents(eventArray);
      }
    });
  }, []);

  const handleSingleItem = (item) => {
    navigation.navigate('OneEvent', { item });
  };

  const filteredData = events.filter((item) => {
    const normalizedQuery = searchQuery.toLowerCase();
    return item.location.toLowerCase().includes(normalizedQuery);
  });

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => handleSingleItem(item)}>
        <View style={styles.itemContainer}>
          <Text style={styles.title}>Location :  {item.location}</Text>
          <Text style={styles.body}>Time: {item.time}</Text>
        </View>
      </TouchableOpacity>
    );
  };


  const handleAddToWish = (event) => {
    const wishRef = ref(db, "wish");
    const newWishKey = push(wishRef).key; // Generate a new key for the wish

    if (newWishKey) {
      set(ref(db, `wish/${newWishKey}`), event)
        .then(() => {
          // Event added to "wish" successfully
          console.log("Event added to wish!");
        })
        .catch((error) => {
          // Handle errors if necessary
          console.error("Error adding event to wish:", error);
        });
    }
  };

  const handleImagePress1 = () => {
    navigation.navigate("AddEvent");
  };




  const handleDeleteevent = (eventId) => {
    const eventRef = ref(db, `event/${eventId}`);
    remove(eventRef);
  };

  const handleUpdateClick = (event) => {
    const { id: eventId, eventName, location, date, time, organization, account } = event;
    navigation.navigate('UpdateEvent', { eventId, eventName, location, date, time, organization, account });
  };

  const navigateToBack = () => {
    navigation.goBack();
}

  return (
    <View style={styles.container}>
      <ImageBackground source={imagePath.background} style={styles.imgStyle}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.headerStyle}>
          <TouchableOpacity onPress={navigateToBack}>
                        <Image source={imagePath.backarrow} />
                    </TouchableOpacity>
            <Image source={imagePath.bell} />
          </View>
          <Text style={styles.AdvertiseTextStyle}> Events</Text>
          <View style={styles.buttonContainer}>
          </View>
          <View style={styles.buttonContainer}>
      {/* "My Events" button */}
      <TouchableOpacity
        style={styles.myEventsButton}
        onPress={() => navigation.navigate("WishEvents")}
      >
        <Text style={styles.myEventsButtonText}>My Events</Text>
      </TouchableOpacity>
    </View>
        </SafeAreaView>
      </ImageBackground>
      
      <View
        style={{
          marginTop: moderateVerticalScale(14),
          marginHorizontal: moderateScale(16),
          flex: 1,
        }}
      >
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Card style={styles.Card}>
              <TouchableOpacity >
                <Text style={styles.title}>{item.eventName}</Text>
                <Text style={styles.body}><Text style={{ fontWeight: "bold" }}>Location :</Text>{item.location}</Text>
                <Text style={styles.body}><Text style={{ fontWeight: "bold" }}>Organization :</Text>{item.organization}</Text>
                <Text style={styles.body}><Text style={{ fontWeight: "bold" }}>Date :</Text>{item.date}</Text>
                <Text style={styles.body}><Text style={{ fontWeight: "bold" }}>Time :</Text>{item.time}</Text>
                <Text style={styles.body}><Text style={{ fontWeight: "bold" }}>Account No :</Text>{item.account}</Text>

                <View style={styles.iconContainer}>
                 
                  <Btn btnText={"Add"} onPress={() => handleAddToWish(item)} />
                  <TouchableOpacity onPress={() => handleUpdateClick(item)}>
                    <Icon
                      name="pencil"
                      size={24}
                      color="blue"
                      style={styles.icon}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => handleDeleteevent(item.id)}>
                    <Icon
                      name="trash"
                      size={24}
                      color="red"
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                </View>

              </TouchableOpacity>
            </Card>


          )}
        />

        <TouchableOpacity style={styles.AddButton} onPress={handleImagePress1}>
          <View>
            <Image source={imagePath.addbtn} style={styles.AddIconImage} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  flatStyle: {
    backgroundColor: colors.white,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    padding: moderateScale(16),
    borderRadius: moderateScale(4),
    margin: 2,
  },
  flexView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  AddButton: {
    width: 50,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 100,
    display: "flex",
    bottom: 0,
    right: 0,
    position: "absolute",
    marginRight: 25,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  AddIconImage: {
    width: 50,
    height: 50,
    // backgroundColor:"#fff",
    // color:"#fff"
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.themeColor,
  },
  body: {
    fontSize: 15,
    marginTop: 8,
    color: colors.blackOpacity80,
  },
  searchInput: {
    width: "80%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    fontSize: 16,
    backgroundColor: "white", // Background color
    marginBottom: 28,
    alignSelf: "center",
  },
  date: {
    // marginLeft: 240,
    color: colors.blackOpacity50,
  },
  commentcontainer: {},
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

export default AllEvents;