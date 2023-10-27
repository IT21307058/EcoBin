import { StyleSheet, Text, View, ImageBackground, SafeAreaView, FlatList, Button, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import imagePath from '../../constants/imagePath';
// import dummyData from './dummyData';
import ButtonComp from '../../Components/ButtonComp';
import colors from '../../styles/color';
// import TextInputWithLabel from '../../Components/TextInputWithLabel';
import { useNavigation } from '@react-navigation/native'

import { db } from '../../../config';
import { ref, set, push, remove } from 'firebase/database'

const OnePost = ({ route }) => {
    const navigation = useNavigation();

    const { item } = route.params; // Get the item data passed from the previous screen

    // const [advertiseType, setAdvertiseType] = useState(item.advertiseType);
    const [communityType, setCommunityType] = useState(item.communityType);
    const [topic, setTopic] = useState(item.topic);
    const [description, setDescription] = useState(item.description);


    //delete function
    const handleDelete = (itemId) => {
        // Remove the item from Firebase Realtime Database
        const advertiseRef = ref(db, 'community/' + itemId);
        remove(advertiseRef)
            .then(() => {
                console.log('Community post deleted successfully');
                // You can also update the state to remove the deleted item from the list
                Alert.alert(
                    'Community post deleted successfully',
                    null, // You can pass null for the message if you don't want a message
                    [
                      {
                        text: 'OK',
                        onPress: () => navigation.navigate('CommunityHome'), // Reset dataAdded state
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
                console.error('Error deleting advertise:', error);
            });
    };

    const handleUpdate = (item) => {
        // Navigate to the update page with the item data
        navigation.navigate('UpdatePost', { item });
    };

    const handleFeedback = (item) => {
        // Navigate to the update page with the item data
        navigation.navigate('FeedbackPage', { item });
    };

    return (
        // <View style={styles.container}>

        //     <SafeAreaView>
        //         <View style={styles.headerStyle}>
        //             <Image source={imagePath.backarrow} />
        //             <Image source={imagePath.bell} />
        //         </View>
        //         <View style={{ marginTop: 50, alignSelf: 'center' }}>
        //             <Text style={styles.headerText}>Create Your Post</Text>
        //         </View>
        //         <View style={{
        //             backgroundColor: colors.borderColor,
        //             shadowColor: '#000',
        //             shadowOffset: { width: 0, height: 2 },
        //             shadowOpacity: 0.2,
        //             width:'75%',
        //             alignSelf:"center",
        //             padding: moderateScale(15),
        //             borderRadius: moderateScale(20),
        //             paddingHorizontal: moderateScale(24),
        //             paddingTop: moderateVerticalScale(44)
        //         }}>
        //             <Text style={{fontSize: scale(16), color:'#000'}}>Beach cleanup success</Text>
        //             <Text style={{fontSize: scale(14), color:colors.blackOpacity30}}>description</Text>


        //             <ButtonComp 
        //             btnText={'Give Feedback'}
        //             onPress={() => navigation.navigate('FeedbackPage')}
        //              />

        //         </View>
        //     </SafeAreaView>
        // </View>

        <View style={styles.container}>
            <SafeAreaView>
                <View style={styles.headerStyle}>
                    <TouchableOpacity onPress={() => navigation.navigate('CommunityHome')}>
                        <Image source={imagePath.bluearrow} />
                    </TouchableOpacity>
                    <Image source={imagePath.bluebell} />
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
                    {/* <Text style={styles.label}>Advertise Type:</Text>
                <Text style={styles.value}>{advertiseType}</Text> */}

                    <Text style={styles.label}>Topic:</Text>
                    <Text style={styles.value}>{topic}</Text>

                    <Text style={styles.label}>Description:</Text>
                    <Text style={styles.value}>{description}</Text>

                    <ButtonComp
                        btnText={'Give Feedback'}
                        onPress={() => handleFeedback(item)}
                    />
                    <Text />
                    <ButtonComp btnText={'Update'} btnStyle={{
                        backgroundColor: colors.white,
                        borderWidth: 1,
                        borderColor: colors.themeColor,
                    }}
                        btnTextStyle={{ color: colors.themeColor }}
                        onPress={() => handleUpdate(item)} />
                    <Text />
                    <ButtonComp btnText={'Delete'} btnStyle={{
                        backgroundColor: '#FF0000',
                        borderWidth: 1,
                        borderColor: colors.themeColor,
                    }}
                        btnTextStyle={{ color: colors.themeColor }}
                        onPress={() => handleDelete(item.id)} />
                </View>
            </SafeAreaView>
        </View>
    )
}

export default OnePost

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        justifyContent: 'space-between'
    },
    title: {
        textTransform: 'uppercase',
        fontSize: scale(18),
        fontWeight: 'bold',
        color: colors.themeColor,
        marginBottom: scale(14)
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 16,
        width: '80%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.blackOpacity30
    },
    value: {
        fontSize: 20,
        marginBottom: 10,
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
    headerText: {
        textTransform: 'uppercase',
        fontSize: scale(18),
        fontWeight: 'bold',
        color: colors.themeColor,
        marginBottom: scale(14)
    }
})