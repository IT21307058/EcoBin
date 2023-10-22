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
import DateTimePicker from "@react-native-community/datetimepicker";

import { db } from "../../../config";
import { ref, set } from "firebase/database";

const UpdateReminder = ({ route }) => {
  const navigation = useNavigation();

  const { item } = route.params;
  const [name, setName] = useState(item.name);
  const [selectedDays, setSelectedDays] = useState(item.days);
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);

  const formatTime = (time) => {
    const options = { hour: 'numeric', minute: '2-digit' };
    return new Intl.DateTimeFormat('en-US', options).format(time);
  };

  const updateData = () => {
    const formattedTime = formatTime(selectedTime); // Format the time as "3:30 PM"
    const reminderRef = ref(db, `reminder/${item.id}`);
    set(reminderRef, {
      name: name,
      days: selectedDays,
      time: formattedTime, // Save formatted time as a string
    })
      .then(() => {
        console.log("Data updated successfully");
        navigation.navigate("AllReminder");
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerStyle}>
        <TouchableOpacity onPress={() => navigation.navigate("AllReminder")}>
          <Image source={imagePath.backarrow} />
        </TouchableOpacity>
        <Image source={imagePath.bell} />
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.headerText}>Update Your Reminder</Text>
        <TextInput
          placeholder="Enter Reminder Name"
          value={name}
          onChangeText={(text) => setName(text)}
          style={styles.input}
        />
        <Text style={styles.label}>Select Days:</Text>
        <Picker
          selectedValue={selectedDays}
          onValueChange={(itemValue) => setSelectedDays(itemValue)}
          mode="multiple"
          style={styles.input}
        >
          {[
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ].map((day, index) => (
            <Picker.Item key={index} label={day} value={day} />
          ))}
        </Picker>
        <Text style={styles.label}>Select Time:</Text>
        <TouchableOpacity
          onPress={() => setShowTimePicker(true)}
          style={styles.input}
        >
          <Text>{selectedTime.toLocaleTimeString()}</Text>
        </TouchableOpacity>
        {showTimePicker && (
          <DateTimePicker
            value={selectedTime}
            mode="time"
            display="default"
            onChange={(event, selectedDate) => {
              setShowTimePicker(false);
              if (selectedDate) {
                setSelectedTime(selectedDate);
              }
            }}
          />
        )}
        <TouchableOpacity style={styles.saveButton} onPress={updateData}>
          <Text style={styles.buttonText}>Save Reminder</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    width: "90%",
    backgroundColor: colors.borderColor,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    padding: moderateScale(15),
    borderRadius: moderateScale(20),
    marginTop: moderateVerticalScale(20),
  },
  label: {
    fontSize: scale(16),
    marginBottom: moderateVerticalScale(8),
    color: colors.themeColor,
  },
  input: {
    backgroundColor: "white",
    borderRadius: moderateScale(10),
    padding: moderateScale(10),
    marginBottom: moderateVerticalScale(16),
  },
  saveButton: {
    backgroundColor: colors.themeColor,
    borderRadius: moderateScale(10),
    padding: moderateScale(14),
    width: "100%",
    alignItems: "center",
    marginTop: moderateVerticalScale(20),
  },
  buttonText: {
    color: "white",
    fontSize: scale(16),
  },
  headerText: {
    textTransform: "uppercase",
    fontSize: scale(25),
    fontWeight: "bold",
    color: colors.themeColor,
    marginBottom: moderateScale(14),
  },
  headerStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: moderateScale(20),
    width: "100%",
  },
});

export default UpdateReminder;
