import { StyleSheet, Text, View, ImageBackground, SafeAreaView, TextInput, FlatList, Button, Image, TouchableOpacity } from 'react-native'
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

// const CommentList = ({ item }) => {
//     return (
//         <View style={styles.commentItem}>
//             <Text style={styles.commentText}>{item.comment}</Text>
//         </View>
//     );
// };

const FeedbackPage = ({ route }) => {
    const navigation = useNavigation();

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
    const [comments, setComments] = useState([]);


    //add post function
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

        // Create a reference to the comments for this specific post
        const commentsRef = ref(db, `feedbackCommunity/${item.id}`);

        // Listen for changes to the comments for this post
        onValue(commentsRef, (snapshot) => {
            if (snapshot.exists()) {
                // If there are comments, update the comments state
                const commentsData = snapshot.val();
                const commentsArray = Object.values(commentsData);
                setComments(commentsArray);
            } else {
                // If there are no comments, set the comments state to an empty array
                setComments([]);
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
                    <TouchableOpacity onPress={() => navigation.navigate('CommunityHome')}>
                        <Image source={imagePath.bluearrow} />
                    </TouchableOpacity>
                    <Image source={imagePath.bluebell} />
                </View>
                <View style={{ marginTop: 10, alignSelf: 'center' }}>
                    <Text style={styles.headerText}>{communityType}</Text>
                </View>
                <View style={{
                    backgroundColor: colors.borderColor,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.2,
                    width: '80%',
                    alignSelf: "center",
                    padding: moderateScale(15),
                    borderRadius: moderateScale(20),
                    paddingHorizontal: moderateScale(24),
                    paddingTop: moderateVerticalScale(44)
                }}>
                    <Text style={styles.title}>{topic}</Text>
                    <Text style={styles.body}>{description}</Text>

                    <TextInput placeHolder="Enter your Feedback" value={feedback}
                        onChangeText={(text) => setFeedback(text)} multiline={true} // Enable multiline input
                        numberOfLines={7} // Set the number of lines you want to display initially
                        maxLength={100} // Set the maximum character count (200 words)
                        textAlignVertical='top' // Set the cursor to start at the top-left corner
                        style={styles.input} />


                    <ButtonComp
                        btnText={'Comment'}
                        onPress={dataAddOn}
                    />

                </View>
                <View style={styles.feedbackCountContainer}>
                    <Text style={{fontSize:13, color:colors.themeColor}}>Comment Count: {feedbackCount}</Text>
                </View>

                <FlatList
                    data={comments}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.commentContainer}>
                            <View style={styles.commentItem}>
                                <Text style={styles.commentText}>{item.feedback}</Text>
                            </View>
                        </View>
                    )}
                />
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
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: colors.themeColor
    },
    body: {
        fontSize: 15,
        marginTop: 8,
        color: colors.blackOpacity80,
        marginBottom: 10
    },
    commentContainer: {
        marginHorizontal: 16,
        marginVertical: 8,
        backgroundColor: '#00A86B',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        borderColor: 'green',
        // elevation: 2, 
      },
    
      commentItem: {
        padding: 10,
      },
    
      commentText: {
        fontSize: 16,
        color: colors.white,
      },
      feedbackCountContainer: {
        // marginVertical: 20,
        marginTop: 10,
        marginBottom:5,
        alignSelf: 'center',
      }
})