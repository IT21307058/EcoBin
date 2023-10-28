import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, Image, TextInput } from "react-native";
import ButtonComp from "../../Components/ButtonComp";
import { SafeAreaView } from "react-native-safe-area-context";
import { ref, set, push } from 'firebase/database';
import { db } from "../../../config";
import colors from '../../styles/color';
import imagePath from "../../constants/imagePath";
import { moderateScale, moderateVerticalScale, scale } from "react-native-size-matters";

const AddEvent = () => {
  const [eventName, setEventName] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [organization, setOrganization] = useState('');
  const [account, setAccount] = useState('');

  const [error, setError] = useState(null);

  const addEvent = () => {
    // Basic form validation
    if (!eventName || !location || !date || !time || !organization || !account) {
      setError("Please fill in all fields");
      return;
    }

    const eventRef = ref(db, 'event');
    const newEventRef = push(eventRef);

    set(newEventRef, {
      eventName: eventName,
      location: location,
      date: date,
      time: time,
      organization: organization,
      account: account,
    })
      .then(() => {
        console.log('Event added successfully');
        // Clear input fields after successful submission
        setEventName('');
        setLocation('');
        setDate('');
        setTime('');
        setOrganization('');
        setAccount('');
        setError(null);
      })
      .catch((error) => {
        console.error('Error adding data:', error);
        setError("An error occurred while adding the event.");
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <SafeAreaView>
          <View style={styles.headerStyle}>
            <Image source={imagePath.backarrow} />
            <Image source={imagePath.bell} />
          </View>
          <View style={{ marginTop: 50, alignSelf: 'center' }}>
            <Text style={styles.headerText}>Create Your Own Event</Text>
          </View>
          <View style={styles.formContainer}>
            <TextInput
              placeholder='Event Name'
              placeholderTextColor='lightgray'
              value={eventName}
              onChangeText={(text) => setEventName(text)}
              style={styles.input}
            />
            <TextInput
              placeholder="Location"
              placeholderTextColor='lightgray'
              value={location}
              onChangeText={(text) => setLocation(text)}
              style={styles.input}
            />
            <TextInput
              placeholder="Date"
              placeholderTextColor='lightgray'
              value={date}
              onChangeText={(text) => setDate(text)}
              style={styles.input}
            />
            <TextInput
              placeholder="Time"
              placeholderTextColor='lightgray'
              value={time}
              onChangeText={(text) => setTime(text)}
              style={styles.input}
            />
            <TextInput
              placeholder="Organization"
              placeholderTextColor='lightgray'
              value={organization}
              onChangeText={(text) => setOrganization(text)}
              style={styles.input}
            />
            <TextInput
              placeholder="Account No"
              placeholderTextColor='lightgray'
              value={account}
              onChangeText={(text) => setAccount(text)}
              style={styles.input}
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
            <ButtonComp btnText={'Create'} onPress={addEvent} />
          </View>
        </SafeAreaView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'space-between'
  },
  headerText: {
    textTransform: 'uppercase',
    fontSize: scale(18),
    fontWeight: 'bold',
    color: colors.themeColor,
    marginBottom: scale(14)
  },
  headerStyle: {
    paddingVertical: moderateVerticalScale(16),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(16)
  },
  formContainer: {
    backgroundColor: colors.borderColor,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    width: '75%',
    alignSelf: "center",
    padding: moderateScale(15),
    borderRadius: moderateScale(20),
    paddingHorizontal: moderateScale(24),
    paddingTop: moderateVerticalScale(44)
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    width: '100%',
    fontSize: 16,
    marginBottom: 28
  },
  scrollViewContent: {
    flexGrow: 1, // Allow the content to grow inside the ScrollView
    backgroundColor: colors.white,
    justifyContent: 'space-between',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default AddEvent;
