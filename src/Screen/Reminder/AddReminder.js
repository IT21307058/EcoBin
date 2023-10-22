import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import {
    scale,
    verticalScale,
    moderateScale,
    moderateVerticalScale,
  } from "react-native-size-matters";
import imagePath from "../../constants/imagePath";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import colors from "../../styles/color";
import DateTimePicker from '@react-native-community/datetimepicker';
import { db } from "../../../config";
import { ref, set, push } from "firebase/database";

// import { DateTimePicker } from "expo";




const AddReminder = () => {
  const [name, setName] = useState("");
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);

  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const formattedTime = selectedTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
  
  const navigation = useNavigation();
  
  const handleSaveReminder = () => {
    // Use the Firebase Realtime Database reference to push (add) data
    const reminderRef = ref(db, "reminder");
    const newReminderRef = push(reminderRef); // Generates a unique ID
    set(newReminderRef, {
      name: name,
      days: selectedDays,
      time: formattedTime, // Convert date object to string or store as timestamp based on your needs
    })
      .then(() => {
        console.log("Reminder added successfully");
        setName("");
        setSelectedDays([]);
        setSelectedTime(new Date());
        navigation.navigate("AllReminder");
        // ...perform other actions after successfully saving data
      })
      .catch((error) => {
        console.error("Error adding reminder:", error);
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
      <View style={{ marginTop: 50, alignSelf: "center" }}>
        <Text style={styles.headerText}>Set Your Reminder</Text>
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Reminder Name:</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Enter Reminder Name"
            value={name}
            onChangeText={(text) => setName(text)}
            style={styles.input}
          />
        </View>
        <Text style={styles.label}>Select Days:</Text>
        <View style={styles.inputContainer}>
          <Picker
            selectedValue={selectedDays}
            onValueChange={(itemValue) => setSelectedDays(itemValue)}
            mode="multiple"
            style={styles.input}
          >
            {daysOfWeek.map((day, index) => (
              <Picker.Item key={index} label={day} value={day} />
            ))}
          </Picker>
        </View>
        <Text style={styles.label}>Select Time:</Text>
        <View style={styles.inputContainer}>
          <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.input}>
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
        </View>
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveReminder}>
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
  inputContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: moderateVerticalScale(16),
  },
  input: {
    padding: moderateScale(10),
  },
  saveButton: {
    backgroundColor: "blue",
    borderRadius: 10,
    padding: moderateScale(14),
    width: moderateScale(200),
    alignItems: "center",
    alignSelf: "center",
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
    width: "90%",
    alignSelf: "center",
    marginTop:-130
  },
});


export default AddReminder;
