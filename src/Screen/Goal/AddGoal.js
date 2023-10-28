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
} from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";

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
// import { Picker } from '@react-native-picker/picker';
//   import DatePicker from "react-native-datepicker";
//   import DateTimePicker from "@react-native-community/datetimepicker";
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";

import { db } from "../../../config";
import { ref, set, push } from "firebase/database";

const AddGoal = () => {
  // const navigation = useNavigation();
  const navigation = useNavigation();
  const today = new Date();
  const startDate = getFormatedDate(
    today.setDate(today.getDate() + 1),
    "YYYY/MM/DD"
  );

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  // const [date, setDate] = useState(new Date());
  // const [showDatePicker, setShowDatePicker] = useState(false);

  



  function handleChange(propDate) {
    setDate(propDate);
  }

  const dataAddOn = () => {
    // Use the Firebase Realtime Database reference to push (add) data
    const goalRef = ref(db, "goal");
    const newGoalRef = push(goalRef); // Generates a unique ID
    set(newGoalRef, {
      name: name,
      date: date,
    })
      .then(() => {
        console.log("Data added successfully");
        setName("");
        navigation.navigate("AllGoal");
        //   setFormattedDate("");
      })
      .catch((error) => {
        console.error("Error adding data:", error);
      });
  };

  // const onDateChange = (event, selectedDate) => {
  //   const currentDate = selectedDate || date;
  //   setShowDatePicker(false);
  //   setDate(currentDate);
  // };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.headerStyle}>
          <TouchableOpacity onPress={() => navigation.navigate("AllGoal")}>
            <Image source={imagePath.backarrow} />
          </TouchableOpacity>

          <Image source={imagePath.bell} />
        </View>
        <View style={{ marginTop: 50, alignSelf: "center" }}>
          <Text style={styles.headerText}>Set Your Goal</Text>
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
            paddingTop: moderateVerticalScale(10),
          }}
        >
          <Text style={{ fontSize: 30, marginBottom: 25, alignSelf: "center" }}>
            {" "}
            New Goal{" "}
          </Text>

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Goal name"
              placeholderTextColor="lightgray"
              value={name}
              onChangeText={(text) => setName(text)}
              style={styles.input}
            />
          </View>

          <DatePicker
            mode="calendar"
            selected={date}
            minimumDate={startDate}
            onDateChange={handleChange}
            style={{
              width: 300,
              height: 320, // Adjust the height of the calendar
              backgroundColor: "white", // Background color of the calendar
            }}
          />

          {/* <TouchableOpacity
              style={styles.datePickerButton}
              onPress={toggleDatePicker}
            >
              <TextInput
                placeholder="Select Date"
                placeholderTextColor="lightgray"
                editable={false}
                value={date.toDateString()} // Display selected date here
                style={styles.input}
              />
            </TouchableOpacity> */}

          {/* {showDatePicker && (
              <View style={styles.dateTimePickerContainer}>
                <DateTimePicker
                  mode="date"
                  display="spinner"
                  value={date}
                  onChange={onChange}
                />
              </View>
            )} */}

          <TouchableOpacity style={styles.addButton} onPress={dataAddOn}>
            <Text style={styles.buttonText}>Add Goal</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default AddGoal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    width: 300,
    fontSize: 16,
  },
  datePickerButton: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    width: 300,
    alignItems: "center",
  },
  dateTimePickerContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    zIndex: 999,
  },
  headerText: {
    textTransform: "uppercase",
    fontSize: scale(25),
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
    paddingHorizontal: moderateScale(1),
  },
  addButton: {
    backgroundColor: "blue",
    borderRadius: 10,
    padding: 10,
    width: 300,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  // input: {
  //   backgroundColor: "white",
  //   borderRadius: 10,
  //   padding: 10,
  //   width: "100%",
  //   fontSize: 16,
  //   marginBottom: 28,
  // },
});
