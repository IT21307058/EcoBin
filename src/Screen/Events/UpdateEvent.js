import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { ref, set } from "firebase/database";
import { db } from "../../../config";
import colors from "../../styles/color";
import { moderateScale } from "react-native-size-matters";
import Btn from "../../Components/Btn";

const UpdateEvent = ({ route, navigation }) => {
  const { eventId, eventName, location, date, time, organization } = route.params;

  const [updatedEventName, setUpdatedEventName] = useState(eventName);
  const [updatedLocation, setUpdatedLocation] = useState(location);
  const [updatedDate, setUpdatedDate] = useState(date);
  const [updatedTime, setUpdatedTime] = useState(time);
  const [updatedOrganization, setUpdatedOrganization] = useState(organization);

  const handleUpdateEvent = () => {
    const eventRef = ref(db, `event/${eventId}`);
    set(eventRef, {
      eventName: updatedEventName,
      location: updatedLocation,
      date: updatedDate,
      time: updatedTime,
      organization: updatedOrganization,
    })
      .then(() => {
        console.log('Event data updated successfully');
        navigation.navigate("AllEvents"); // Navigate back to the AllEvents screen after updating.
      })
      .catch((error) => {
        console.error('Error updating event data:', error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Update Event</Text>
      <TextInput
        style={styles.input}
        placeholder="Event Name"
        value={updatedEventName}
        onChangeText={(text) => setUpdatedEventName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Location"
        value={updatedLocation}
        onChangeText={(text) => setUpdatedLocation(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Date"
        value={updatedDate}
        onChangeText={(text) => setUpdatedDate(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Time"
        value={updatedTime}
        onChangeText={(text) => setUpdatedTime(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Organization"
        value={updatedOrganization}
        onChangeText={(text) => setUpdatedOrganization(text)}
      />
      <TouchableOpacity style={styles.updateButton} onPress={handleUpdateEvent}>
        <Text style={styles.buttonText}>Update Event</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    fontSize: 18,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.borderColor,
    padding: 10,
    marginBottom: 20,
    borderRadius: 8,
  },
  updateButton: {
    backgroundColor: colors.themeColor,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default UpdateEvent;