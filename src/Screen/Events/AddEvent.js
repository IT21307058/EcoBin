import React from "react";
import { Text, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import ButtonComp from "../../Components/ButtonComp";

import { SafeAreaView, View, StyleSheet, Image, TextInput, Alert} from "react-native";
import imagePath from "../../constants/imagePath";
import colors from '../../styles/color'
import { moderateScale, moderateVerticalScale, scale } from "react-native-size-matters";

import { db } from "../../../config";
import { ref, set, push } from 'firebase/database';




const AddEvent = () => {

    const [eventName, setEventName] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [organization, setOrganization] = useState('');

    const addEvent = () => {

        const eventRef = ref(db, 'event');
        const newEventRef = push(eventRef);

        set(newEventRef, {
            eventName : eventName,
            location : location,
            date : date,
            time : time,
            organization : organization,
        })
        .then(() => {
            console.log('Event added successfully');
            setEventName('');
            setLocation('');
            setDate('');
            setTime('');
            setOrganization('');
        })
        .catch((error) => {
            console.error('Error adding data:', error);
        })
    }

    return(
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
                <View style={{
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
                }}>

                    <TextInput
                        placeholder='Event Name'
                        placeholderTextColor='lightgray'
                        value={eventName}
                        onChangeText={(text) => setEventName(text)}
                        style={styles.input} />

                    <TextInput
                        placeholder="Location"
                        placeholderTextColor='lightgray'
                        value={location}
                        onChangeText={(text) => setLocation(text)}
                        style={styles.input}/>

                    <TextInput
                        placeholder="date"
                        placeholderTextColor='lightgray'
                        value={date}
                        onChangeText={(text) => setDate(text)}
                        style={styles.input}/>

                    <TextInput
                        placeholder="time"
                        placeholderTextColor='lightgray'
                        value={time}
                        onChangeText={(text) => setTime(text)}
                        style={styles.input}/>


                    <TextInput
                        placeholder="Organization"
                        placeholderTextColor='lightgray'
                        value={organization}
                        onChangeText={(text) => setOrganization(text)}
                        style={styles.input}/>


                    <View style={styles.buttonSpacer} />

                    <ButtonComp
                        btnText={'Create'}
                        onPress={addEvent}
                    />

                </View>
            </SafeAreaView>
        </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container:{
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
    buttonSpacer: {
        height: 20, // Specify the desired space height
      },
})

export default AddEvent;