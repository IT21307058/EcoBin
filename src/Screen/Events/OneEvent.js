import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    SafeAreaView,
    FlatList,
    Button,
    Image,
    TouchableOpacity,
  } from "react-native";
  import React, { useState } from "react";
  import {
    scale,
    verticalScale,
    moderateScale,
    moderateVerticalScale,
  } from "react-native-size-matters";
  import imagePath from "../../constants/imagePath";
  // import dummyData from './dummyData';
  import ButtonComp from "../../Components/ButtonComp";
  import colors from "../../styles/color";
  // import TextInputWithLabel from '../../Components/TextInputWithLabel';
  import { useNavigation } from "@react-navigation/native";
  
  import { db } from "../../../config";
  import { ref, set, push, remove } from "firebase/database";
  
  const OneEvent = ({ route }) => {
    const navigation = useNavigation();
    const { item } = route.params;

    const [eventName, setEventName] = useState(item.eventName);
    const [location, setLocation] = useState(item.location);
    const [date, setDate] = useState(item.date);
    const [time, setTime] = useState(item.time);
    const [organization, setOrganization] = useState(item.organization);
    const [account, setAccount] = useState(item.account);
  
    const handleDelete = (itemId) => {
      const eventRef = ref(db, "event/" + itemId);
      remove(eventRef)
        .then(() => {
          console.log("Event deleted successfully");
          navigation.navigate("ALlEvents"); // Navigate back to the AllGoal screen after deleting the goal
        })
        .catch((error) => {
          console.error("Error deleting event:", error);
        });
    };
  
    const handleUpdate = (item) => {
      navigation.navigate("UpdateEvent", { item });
    };
  
    return (
      <View style={styles.container}>
        <SafeAreaView>
          <View style={styles.headerStyle}>
            <TouchableOpacity onPress={() => navigation.navigate("AllEvents")}>
              <Image source={imagePath.bluearrow} />
            </TouchableOpacity>
            <Image source={imagePath.bluebell} />
          </View>
          <View style={styles.card}>

            <Text style={styles.label}>Location:</Text>
            <Text style={styles.value}>{location}</Text>

            <Text style={styles.label}>Time:</Text>
            <Text style={styles.value}>{time}</Text>
  
            <ButtonComp
              btnText={"Update"}
              btnStyle={styles.updateButton}
              btnTextStyle={styles.buttonText}
              onPress={() => handleUpdate(item)}
            />
            <ButtonComp
              btnText={"Delete"}
              btnStyle={styles.deleteButton}
              btnTextStyle={styles.buttonText}
              onPress={() => handleDelete(item.id)}
            />
          </View>
        </SafeAreaView>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
      justifyContent: "space-between",
    },
    card: {
      backgroundColor: "white",
      borderRadius: moderateScale(10),
      padding: moderateScale(20),
      margin: moderateScale(20),
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    label: {
      fontSize: moderateScale(16),
      fontWeight: "bold",
      color: colors.blackOpacity30,
    },
    value: {
      fontSize: moderateScale(18),
      marginBottom: moderateScale(10),
      color: colors.black,
    },
    headerStyle: {
      paddingVertical: moderateScale(16),
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.2,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: moderateScale(16),
    },
    updateButton: {
      backgroundColor: colors.themeColor,
      borderRadius: moderateScale(10),
      padding: moderateScale(10),
      marginTop: moderateScale(20),
    },
    deleteButton: {
      backgroundColor: "red",
      borderRadius: moderateScale(10),
      padding: moderateScale(10),
      marginTop: moderateScale(10),
    },
    buttonText: {
      color: colors.white,
      fontSize: moderateScale(16),
      fontWeight: "bold",
    },
  });
  
  export default OneEvent;
  