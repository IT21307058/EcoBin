import { StyleSheet, Text, View, ImageBackground, SafeAreaView, TextInput, FlatList, Button, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import imagePath from '../../constants/imagePath';
import dummyData from './dummyData';
import ButtonComp from '../../Components/ButtonComp';
import colors from '../../styles/color';
// import TextInputWithLabel from '../../Components/TextInputWithLabel';
import { useNavigation } from '@react-navigation/native'
import { Picker } from '@react-native-picker/picker';

import { db } from '../../../config';
import { ref, set } from 'firebase/database'

const UpdateAdvertise = ({ route }) => {
    const navigation = useNavigation();

    const { item } = route.params; // Get the item data passed from the previous screen

    const [advertiseType, setAdvertiseType] = useState(item.advertiseType);
    const [topic, setTopic] = useState(item.topic);
    const [description, setDescription] = useState(item.description);

    // Get the current date and time
    const currentDate = new Date();

    // Format the date as a string (you can customize the format)
    const formattedDate = currentDate.toISOString();


    //update function advertise
    const updateData = () => {
        const advertiseRef = ref(db, `advertise/${item.id}`);
        set(advertiseRef, {
            advertiseType: advertiseType,
            topic: topic,
            description: description,
            date:formattedDate,
        })
            .then(() => {
                console.log('Data updated successfully');
                Alert.alert(
                    'Advertise updated Successfully',
                    null, // You can pass null for the message if you don't want a message
                    [
                      {
                        text: 'OK',
                        // onPress: () => navigation.navigate('CommunityHome'), // Reset dataAdded state
                        style: 'cancel', // You can use 'destructive' or 'default' for different styles
                      },
                    ],
                    {
                    //   titleStyle: {
                    //     color: 'green', // Change the title text color
                    //     fontSize: 20,    // Change the title font size
                    //   },
                    //   containerStyle: {
                    //     backgroundColor: 'lightgray', // Change the background color of the alert
                    //   },
                    //   contentContainerStyle: {
                    //     alignItems: 'center', // Center the content inside the alert
                    //   },
                    }
                  );
            })
            .catch((error) => {
                console.error('Error updating data:', error);
            });
    };

    return (
        <View style={styles.container}>

            <SafeAreaView>
                <View style={styles.headerStyle}>
                <TouchableOpacity onPress={() => navigation.navigate('main')}>
                        <Image source={imagePath.bluearrow} />
                    </TouchableOpacity>
                    <Image source={imagePath.bluebell} />
                </View>
                <View style={{ marginTop: 50, alignSelf: 'center' }}>
                    <Text style={styles.headerText}>Update Advertisment</Text>
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
                    {/* <TextInput
                        placeholder='Advertise Type'
                        placeholderTextColor='lightgray'
                        value={advertiseType}
                        onChangeText={(text) => setAdvertiseType(text)}
                        style={styles.input} /> */}

                    <Picker
                        selectedValue={advertiseType}
                        onValueChange={(itemValue) => setAdvertiseType(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Program" value="Program" />
                        <Picker.Item label="Product" value="Product" />
                    </Picker>

                    <TextInput
                        placeholder='Topic'
                        placeholderTextColor='lightgray'
                        value={topic}
                        onChangeText={(text) => setTopic(text)}
                        style={styles.input} />

                    <TextInput
                        placeholder='Description'
                        placeholderTextColor='lightgray'
                        value={description}
                        onChangeText={(text) => setDescription(text)}
                        multiline={true} // Enable multiline input
                        numberOfLines={10} // Set the number of lines you want to display initially
                        maxLength={200} // Set the maximum character count (200 words)
                        textAlignVertical='top' // Set the cursor to start at the top-left corner
                        style={styles.input} />

                    <ButtonComp btnText={'Save'}
                        onPress={() => updateData()}
                    />

                </View>
            </SafeAreaView>
        </View>
    )
}

export default UpdateAdvertise

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
    input: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        width: '100%',
        fontSize: 16,
        marginBottom: 28
    },
})