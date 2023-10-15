import React from 'react';
import { StyleSheet, Text, View, ImageBackground, SafeAreaView, TextInput, FlatList, Button, Image, TouchableOpacity } from 'react-native';
import imagePath from '../../constants/imagePath';
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native'

const CommunityHome = () => {
    const navigation = useNavigation();

    const handleImagePress1 = () => {
        // Navigate to the 'UpdateAdvertise' screen when the image is pressed
        navigation.navigate('AllCommunity');
    };

    const handleImagePress2 = () => {
        // Navigate to the 'UpdateAdvertise' screen when the image is pressed
        navigation.navigate('EducationalUserPage');
    };

    const handleImagePress3 = () => {
        // Navigate to the 'UpdateAdvertise' screen when the image is pressed
        navigation.navigate('EnvironmentOrganizationPage');
    };

    return (
        <View style={styles.container}>
            <ImageBackground
                source={imagePath.background}
                style={styles.imgStyle}
            >
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={styles.headerStyle}>
                        <Image source={imagePath.backarrow} />
                        <Image source={imagePath.bell} />
                    </View>
                    <Text style={styles.AdvertiseTextStyle}>Community</Text>
                </SafeAreaView>
            </ImageBackground>
            <View style={{
                marginTop: moderateVerticalScale(14),
                marginHorizontal: moderateScale(16),
                flex: 1
            }}>
                <View style={styles.container1}>
                    {/* Residential Users Card */}
                    <TouchableOpacity style={styles.card} onPress={handleImagePress1}>
                        <Text style={styles.cardTitle}>Residential Users</Text>
                        {/* Add any additional content specific to Residential Users */}
                    </TouchableOpacity>

                    {/* Educational Institutes Card */}
                    <TouchableOpacity style={styles.card} onPress={handleImagePress2}>
                        <Text style={styles.cardTitle}>Educational Institutes</Text>
                        {/* Add any additional content specific to Educational Institutes */}
                    </TouchableOpacity>

                    {/* Environment Organizations Card */}
                    <TouchableOpacity style={styles.card} onPress={handleImagePress3}>
                        <Text style={styles.cardTitle}>Environment Organizations</Text>
                        {/* Add any additional content specific to Environment Organizations */}
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container1: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 45
    },
    container: {
        flex: 1,
    },
    card: {
      backgroundColor: '#FFFFFF',
      width: '80%',
      padding: 20,
      borderRadius: 10,
      marginBottom: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      elevation: 3,
    },
    cardTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    imgStyle: {
        height: 200,
        width: '100%',
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    AdvertiseTextStyle: {
        fontSize: scale(32),
        color: 'white',
        fontWeight: 'bold',
        marginLeft: 100
    },
    headerStyle: {
        paddingVertical: moderateVerticalScale(16),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        paddingHorizontal: moderateScale(16)
    }
});

export default CommunityHome;