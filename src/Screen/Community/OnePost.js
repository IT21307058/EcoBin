import { StyleSheet, Text, View, ImageBackground, SafeAreaView, FlatList, Button, Image } from 'react-native'
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


    const handleDelete = (itemId) => {
        // Remove the item from Firebase Realtime Database
        const advertiseRef = ref(db, 'community/' + itemId);
        remove(advertiseRef)
            .then(() => {
                console.log('Community post deleted successfully');
                // You can also update the state to remove the deleted item from the list
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
            <Text style={styles.title}>{communityType}</Text>
            <View style={styles.card}>
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
                <Text/>
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
        </View>
    )
}

export default OnePost

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
})