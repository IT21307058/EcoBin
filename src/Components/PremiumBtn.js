//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { moderateScale, scale } from 'react-native-size-matters';
// import imagePath from '../constants/imagePath';
import colors from '../styles/color'


const PremiumBtn = ({
    btnText,
    btnStyle = {},
    onPress = () => { },
    btnTextStyle={}
}) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
            style={{ ...styles.btnStyle, ...btnStyle }}
        >
                <Text style={{...styles.btnTextStyle, ...btnTextStyle}}>{btnText}</Text>
        </TouchableOpacity>
    );
};

// define your styles
const styles = StyleSheet.create({
    btnStyle: {
        marginTop: 20,
        height: moderateScale(45),
        backgroundColor: colors.themeColor,
        borderRadius: moderateScale(20),
        alignItems: 'center',
        justifyContent: 'center',
        width: moderateScale(150),
        alignSelf: 'center', // Add this line to center the button horizontally
    },
    btnTextStyle: {
        fontSize: scale(12),
        color: 'white',
        fontWeight: 'bold',
        textTransform: 'uppercase',
    }
});


//make this component available to the app
export default PremiumBtn;