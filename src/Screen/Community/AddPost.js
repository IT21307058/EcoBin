import { StyleSheet, Text, View, ImageBackground, SafeAreaView, TextInput, FlatList, Button, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import imagePath from '../../constants/imagePath';
// import dummyData from './dummyData';
import ButtonComp from '../../Components/ButtonComp';
import colors from '../../styles/color';
// import TextInputWithLabel from '../../Components/TextInputWithLabel';
import { useNavigation } from '@react-navigation/native'
import { Picker } from '@react-native-picker/picker';

import { db } from '../../../config';
import { ref, set, push } from 'firebase/database'

const AddPost = () => {
    const navigation = useNavigation();

    const [topic, setTopic] = useState('');
    const [description, setDescription] = useState('');
    const [communityType, setCommunityType] = useState('Residential Users');

    // Get the current date and time
    const currentDate = new Date();

    // Format the date as a string (you can customize the format)
    const formattedDate = currentDate.toISOString();

    const dataAddOn = () => {
        // Use the Firebase Realtime Database reference to push (add) data
        const communityRef = ref(db, 'community');
        const newCommunityRef = push(communityRef); // Generates a unique ID
        set(newCommunityRef, {
            communityType: communityType,
            topic: topic,
            description: description,
            date: formattedDate,
        })
            .then(() => {
                console.log('Data added successfully');
                setCommunityType('');
                setTopic('');
                setDescription('');
            })
            .catch((error) => {
                console.error('Error adding data:', error);
            });
    };


    return (
        <View style={styles.container}>

            <SafeAreaView>
                <View style={styles.headerStyle}>
                    <TouchableOpacity onPress={() => navigation.navigate('CommunityHome')}>
                        <Image source={imagePath.bluearrow} />
                    </TouchableOpacity>
                    <Image source={imagePath.bluebell} />
                </View>
                <View style={{ marginTop: 50, alignSelf: 'center' }}>
                    <Text style={styles.headerText}>Create Your Post</Text>
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
                    {/* <TextInputWithLabel label="Community Type" placeHolder="Enter your post topic" inputStyle={{ marginBottom: moderateVerticalScale(28) }} />
                    <TextInputWithLabel label="Topic" placeHolder="Enter your post topic" inputStyle={{ marginBottom: moderateVerticalScale(28) }} />
                    <TextInputWithLabel label="Description" placeHolder="Enter your post description" inputStyle={{ marginBottom: moderateVerticalScale(28) }} />

                    <ButtonComp 
                    btnText={'Publish'}
                    onPress={() => navigation.navigate('AdvertiseHome')}
                     /> */}

                    <Picker
                        selectedValue={communityType}
                        onValueChange={(itemValue) => setCommunityType(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Residential Users" value="Residential Users" />
                        <Picker.Item label="Educational Institutes" value="Educational Institutes" />
                        <Picker.Item label="Environment Organizations" value="Environment Organizations" />
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

                    <ButtonComp
                        btnText={'Publish'}
                        onPress={dataAddOn}
                    />

                </View>
            </SafeAreaView>
        </View>
    )
}

export default AddPost

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
    picker: {
        backgroundColor: 'white',
        borderRadius: 10,
        marginBottom: 28,
    }
})