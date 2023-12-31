import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  TextInput,
  Alert,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { ImageBackground } from "react-native";
import { db } from "../../../config";
import { useNavigation } from "@react-navigation/native";
import { onValue } from "firebase/database";
import imagePath from "../../constants/imagePath";
import colors from "../../styles/color";
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from "react-native-size-matters";
import { ref, set, push } from "firebase/database";
import { Card } from "react-native-paper";
import Btn from "../../Components/Btn";
import Icon from "react-native-vector-icons/FontAwesome";
import { remove } from "firebase/database";
import PremiumBtn from "../../Components/PremiumBtn";


const PremiumV = () => {
  
  const navigation = useNavigation();

  const handleNavigateToSubscription = () => {
    navigation.navigate("Subscription");
  };


  return (
    <View style={styles.container}>
      <ImageBackground source={imagePath.background} style={styles.imgStyle}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.headerStyle}>
            <Image source={imagePath.backarrow} />
            <Image source={imagePath.bell} />
          </View>
          <View style={styles.crownContainer}>
            <Image source={imagePath.crown} style={styles.crownImage} />
          </View>
          <Text style={styles.topicStyle}>Premium Version</Text>
          <View style={styles.bulletContainer}>
            <View style={styles.bullet}>
              <Icon name="check" size={24} color="blue" style={styles.icon} />
              <Text style={styles.bulletText}> Post Advertisement</Text>
            </View>
            <View style={styles.bullet}>
              <Icon name="check" size={24} color="blue" style={styles.icon} />
              <Text style={styles.bulletText}> Create Events</Text>
            </View>
            <View style={styles.bullet}>
              <Icon name="check" size={24} color="blue" style={styles.icon} />
              <Text style={styles.bulletText}> Create Courses</Text>
            </View>
            <View style={styles.bullet}>
              <Icon name="check" size={24} color="blue" style={styles.icon} />
              <Text style={styles.bulletText}> Food Swap</Text>
            </View>
          </View>
          <Text style={styles.fontBStyle}> Upgrade to Premium </Text>
          <PremiumBtn
          btnText={'Rs.400/Month'}
          onPress={handleNavigateToSubscription}
          />
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  topicStyle: {
    marginTop: 130,
    fontSize: 35, // Adjust the font size
    fontWeight: "bold",
    textAlign: "center",
  },
  fontBStyle: {
    fontSize: 30, // Adjust the font size
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },
  bulletContainer: {
    marginTop: 20, // Adjust the margin as needed
    alignItems: "flex-start",
    marginLeft: 70,
  },
  bullet: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5, // Adjust the margin as needed
  },
  bulletText: {
    marginRight: 5, // Adjust the margin as needed
    fontSize: 20, // Adjust the font size
  },
  Card: {
    marginTop: 160,
    borderWidth: 1,
    borderColor: "gray",
    padding: 16,
    marginBottom: 16,
  },
  crownContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 90,
  },
  crownImage: {
    resizeMode: "contain", // You can adjust this based on your requirements
    width: 300, // Adjust the width as needed
    height: 300, // Adjust the height as needed
    marginTop: 30,
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
  orderItem: {
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
});
export default PremiumV;