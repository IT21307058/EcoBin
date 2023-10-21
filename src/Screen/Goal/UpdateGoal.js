import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  TextInput,
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
import { Picker } from "@react-native-picker/picker";
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";


import { db } from "../../../config";
import { ref, set } from "firebase/database";

const UpdateGoal = ({ route }) => {
  const navigation = useNavigation();

  const { item } = route.params; // Get the item data passed from the previous screen

  const [name, setName] = useState(item.name);
  const [date, setDate] = useState(item.date);

  // Get the current date and time
  //   const currentDate = new Date();

  // Format the date as a string (you can customize the format)
  //   const formattedDate = currentDate.toISOString();
  const formattedDate = new Date(date).toLocaleDateString(); // Format the date as per your requirement

  const updateData = () => {
    const goalRef = ref(db, `goal/${item.id}`);
    set(goalRef, {
      name: name,
      date: date,
    })
      .then(() => {
        console.log("Data updated successfully");
        navigation.navigate("AllGoal");
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.headerStyle}>
          <TouchableOpacity onPress={() => navigation.navigate("AllGoal")}>
            <Image source={imagePath.bluearrow} />
          </TouchableOpacity>
          <Image source={imagePath.bluebell} />
        </View>
        <View style={{ marginTop: 50, alignSelf: "center" }}>
          <Text style={styles.headerText}>Update Your Goal</Text>
        </View>
        <View
          style={{
            backgroundColor: colors.borderColor,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            width: "75%",
            alignSelf: "center",
            padding: moderateScale(15),
            borderRadius: moderateScale(20),
            paddingHorizontal: moderateScale(24),
            paddingTop: moderateVerticalScale(44),
          }}
        >
          <TextInput
            placeholder="Name"
            placeholderTextColor="lightgray"
            value={name}
            onChangeText={(text) => setName(text)}
            style={styles.input}
          />

          <DatePicker
            mode="calendar"
            selected={date}
            onDateChange={(selectedDate) => setDate(selectedDate)}
            style={{
              width: "100%",
              height: moderateVerticalScale(320),
              backgroundColor: "white",
              marginBottom: moderateVerticalScale(28),
              borderRadius: moderateScale(10),
            }}
          />

          <ButtonComp
            btnText={"Save"}
            onPress={() => updateData()}
            btnStyle={styles.saveButton} // Add this line to pass the custom styles
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default UpdateGoal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: "space-between",
  },
  headerText: {
    textTransform: "uppercase",
    fontSize: scale(18),
    fontWeight: "bold",
    color: colors.themeColor,
    marginBottom: scale(14),
  },
  headerStyle: {
    paddingVertical: moderateVerticalScale(16),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: moderateScale(16),
  },
  input: {
    backgroundColor: "white",
    borderRadius: moderateScale(10),
    padding: moderateScale(10),
    width: "100%",
    fontSize: moderateScale(16),
    marginBottom: moderateVerticalScale(28),
  },
});
