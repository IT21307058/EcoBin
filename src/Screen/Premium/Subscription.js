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

const Subscription = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  const [cvv, setCvv] = useState("");

  const handleCheckout = () => {
    const subscriptionRef = ref(db, 'subscription');
        const newsubscriptionRef = push(subscriptionRef);

        set(newsubscriptionRef, {
            cardNumber : cardNumber,
            expiryDate : expiryDate,
            nameOnCard : nameOnCard,
            cvv : cvv,
        })
        .then(() => {
            console.log('Subscription added successfully');
            setCardNumber('');
            setExpiryDate('');
            setNameOnCard('');
            setCvv('');
        })
        .catch((error) => {
            console.error('Error adding data:', error);
        })
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
          <Text style={styles.topicStyle}>Subscription</Text>
          <View style={styles.bulletContainer}></View>

          <Card style={styles.cardContainer}>
            <TextInput
              style={styles.input}
              placeholder="Card Number"
              value={cardNumber}
              onChangeText={(text) => setCardNumber(text)}
            />
            <View style={styles.rowContainer}>
              <TextInput
                style={styles.input}
                placeholder="Expiry Date"
                value={expiryDate}
                onChangeText={(text) => setExpiryDate(text)}
              />
              <TextInput
                style={styles.input}
                placeholder="CVV"
                value={cvv}
                onChangeText={(text) => setCvv(text)}
              />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Name on Card"
              value={nameOnCard}
              onChangeText={(text) => setNameOnCard(text)}
            />
          </Card>
          <PremiumBtn btnText={"Checkout"} onPress={handleCheckout} />
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  topicStyle: {
    marginTop: 130,
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "center",
  },
  fontBStyle: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },
  bulletContainer: {
    marginTop: 20,
    alignItems: "flex-start",
    marginLeft: 70,
  },
  bullet: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  bulletText: {
    marginRight: 5,
    fontSize: 20,
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
    resizeMode: "contain",
    width: 300,
    height: 300,
    marginTop: 30,
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
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space between",
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
    backgroundColor: "white",
    marginBottom: 28,
    alignSelf: "center",
  },
  date: {
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
    height: 20,
  },
  cardContainer: {
    marginTop: 1,
    padding: moderateScale(16),
    margin: moderateScale(16),
    borderRadius: moderateScale(8),
  },
  input: {
    height: moderateVerticalScale(40),
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: moderateScale(4),
    paddingHorizontal: moderateScale(10),
    fontSize: moderateScale(16),
    backgroundColor: "white",
    marginBottom: moderateVerticalScale(16),
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default Subscription;
