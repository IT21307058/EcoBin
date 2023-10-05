import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import imagePath from '../constants/imagePath';

const TextInputWithLabel = ({
    label,
    placeHolder,
    onChangeText = () => { },
    inputStyle = {},
    rightIcon,
    ...props
}) => {
    return (
        <View style={{ ...styles.inputStyle, ...inputStyle }}>
            <Text style={styles.labelTextStyle}>{label}</Text>

            <View style={{ flexDirection: "row", justifyContent: 'space-between', alignItems: "center" }}>

                <TextInput placeholder={placeHolder} style={styles.inlineStyle} {...props} />

                {!!rightIcon ? <TouchableOpacity activeOpacity={0.8}>
                    <Image style={{ tintColor: 'rgba(0,0,0,0.4)' }} source={imagePath.hideEye} />
                </TouchableOpacity> : null}
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    inputStyle: {
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.08)',
        borderRadius: moderateScale(4),
    },
    inlineStyle: {
        paddingVertical: moderateVerticalScale(8),
        fontSize: scale(16),
        color: 'rgba(0, 0, 0, 0.08)',
        flex:1
    },
    labelTextStyle: {
        fontSize: scale(14),
        color: 'rgba(0,0,0,0.5)',
    },
    flexView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})


export default TextInputWithLabel