import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import ButtonComp from '../../Components/ButtonComp';
import { useNavigation } from '@react-navigation/native'
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import colors from '../../styles/color';
import { db } from '../../../config';
import { ref, set, push, remove } from 'firebase/database'
import imagePath from '../../constants/imagePath';

const OneAdvertise = ({ route }) => {
    const navigation = useNavigation();

    const { item } = route.params; // Get the item data passed from the previous screen

    const [advertiseType, setAdvertiseType] = useState(item.advertiseType);
    const [topic, setTopic] = useState(item.topic);
    const [description, setDescription] = useState(item.description);

    const handleUpdate = (item) => {
        // Navigate to the update page with the item data
        navigation.navigate('UpdateAdvertise', { item });
    };

    const handleDelete = (itemId) => {
        // Remove the item from Firebase Realtime Database
        const advertiseRef = ref(db, 'advertise/' + itemId);
        remove(advertiseRef)
            .then(() => {
                console.log('Advertise deleted successfully');
                Alert.alert(
                    'Advertise deleted Successfully',
                    null, // You can pass null for the message if you don't want a message
                    [
                      {
                        text: 'OK',
                        onPress: () => navigation.navigate('AdvertiseHome'), // Reset dataAdded state
                        style: 'cancel', // You can use 'destructive' or 'default' for different styles
                      },
                    ],
                    {
                    
                    }
                  );
                // You can also update the state to remove the deleted item from the list
            })
            .catch((error) => {
                console.error('Error deleting advertise:', error);
            });
    };

    return (
        // <View>
        //     <Text>OneAdvertise</Text>
        //     <Text>Advertise Type: {advertiseType}</Text>
        //     <Text>Topic: {topic}</Text>
        //     <Text>Description: {description}</Text>

        //     <ButtonComp btnText={'Update'}
        //         onPress={() => handleUpdate(item)}
        //     />
        // </View>

        <View style={styles.container}>
            <SafeAreaView>
                <View style={styles.headerStyle}>
                    <TouchableOpacity onPress={() => navigation.navigate('main')}>
                        <Image source={imagePath.bluearrow} />
                    </TouchableOpacity>
                    <Image source={imagePath.bluebell} />
                </View>
                <View style={{ marginTop: 50, alignSelf: 'center' }}>
                    <Text style={styles.headerText}>Create Advertisment</Text>
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
                    <Text style={styles.label}>Advertise Type:</Text>
                    <Text style={styles.value}>{advertiseType}</Text>

                    <Text style={styles.label}>Topic:</Text>
                    <Text style={styles.value}>{topic}</Text>

                    <Text style={styles.label}>Description:</Text>
                    <Text style={styles.value}>{description}</Text>

                    <ButtonComp btnText={'Update'} onPress={() => handleUpdate(item)} />
                    <Text />
                    <ButtonComp btnText={'Delete'} btnStyle={{
                        backgroundColor: colors.white,
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

export default OneAdvertise

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