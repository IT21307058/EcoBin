import { StyleSheet, Text, View, ImageBackground, SafeAreaView,TextInput, FlatList, Button, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import imagePath from '../../constants/imagePath';
// import dummyData from './dummyData';
import ButtonComp from '../../Components/ButtonComp';
import colors from '../../styles/color';
import TextInputWithLabel from '../../Components/TextInputWithLabel';
import { useNavigation } from '@react-navigation/native'

import { db } from '../../../config';
import { ref, set, push, remove, onValue } from 'firebase/database'

const FeedbackPage = ({ route }) => {
    // const navigation = useNavigation();

    // const { item } = route.params; // Get the item data passed from the previous screen

    // const [title, setTitle] = useState(item.name);
    // const [body, setBody] = useState(item.title);

    const { item } = route.params; // Get the item data passed from the previous screen

    const [feedback, setFeedback] = useState('');
    // const [advertiseType, setAdvertiseType] = useState(item.advertiseType);
    const [communityType, setCommunityType] = useState(item.communityType);
    const [topic, setTopic] = useState(item.topic);
    const [description, setDescription] = useState(item.description);
    const [feedbackCount, setFeedbackCount] = useState(0); // Initialize feedback count to 0


    const dataAddOn = () => {
        // Use the Firebase Realtime Database reference to push (add) data
        const feedcommunityRef = ref(db, `feedbackCommunity/${item.id}`);
        const feednewCommunityRef = push(feedcommunityRef); // Generates a unique ID
        set(feednewCommunityRef, {
            feedback: feedback,
        })
            .then(() => {
                console.log('Data added successfully');
                setFeedback('')
            })
            .catch((error) => {
                console.error('Error adding data:', error);
            });
    };

    useEffect(() => {
        // Create a reference to the feedback for this specific post
        const feedbackRef = ref(db, `feedbackCommunity/${item.id}`);

        // Listen for changes to the feedback for this post
        onValue(feedbackRef, (snapshot) => {
            if (snapshot.exists()) {
                // If there is feedback data, update the feedback count
                const feedbackData = snapshot.val();
                setFeedbackCount(Object.keys(feedbackData).length);
            } else {
                // If there is no feedback data, set the feedback count to 0
                setFeedbackCount(0);
            }
        });

        // return () => {
        //     // Unsubscribe from the Firebase listener when the component unmounts
        //     off(feedbackRef);
        // };
    }, [item.id]);

    return (
        <View style={styles.container}>

            <SafeAreaView>
                <View style={styles.headerStyle}>
                    <Image source={imagePath.backarrow} />
                    <Image source={imagePath.bell} />
                </View>
                <View style={{ marginTop: 50, alignSelf: 'center' }}>
                    <Text style={styles.headerText}>{communityType}</Text>
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
                    <Text >{topic}</Text>
                    <Text >{description}</Text>

                    <TextInput placeHolder="Enter your Feedback" value={feedback}
                        onChangeText={(text) => setFeedback(text)} multiline={true} // Enable multiline input
                        numberOfLines={10} // Set the number of lines you want to display initially
                        maxLength={200} // Set the maximum character count (200 words)
                        textAlignVertical='top' // Set the cursor to start at the top-left corner
                        style={styles.input} />


                    <ButtonComp
                        btnText={'Submit'}
                        onPress={dataAddOn}
                    />

                </View>
                <View style={styles.feedbackCountContainer}>
                    <Text>Total Feedback Count: {feedbackCount}</Text>
                </View>
            </SafeAreaView>
        </View>
    )
}

export default FeedbackPage

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
    }
})