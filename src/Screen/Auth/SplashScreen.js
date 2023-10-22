import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
// import { firebase } from '../../../config'
import colors from '../../styles/color';
import imagePath from '../../constants/imagePath';


const SplashScreen = () => {

    const navigation = useNavigation()
    // const [email, setEmail] = useState('')
    // const [password, setPassword] = useState('')

    // loginUser = async (email, password) => {
    //     try {
    //         await firebase.auth().signInWithEmailAndPassword(email, password)
    //     } catch (error) {
    //         alert(error.message)
    //     }
    // }

    return (

        <View style={styles.container}>
            <ImageBackground
                source={imagePath.background}
                style={styles.imgStyle}
            >

                {/* <Text style={{ fontWeight: 'bold', fontSize: 40, color: colors.white }}>LOGIN</Text>
                <View style={{ marginTop: 40 }}>
                    <TextInput
                        style={styles.textInput}
                        placeholder='Email'
                        placeholderTextColor="#fff"
                        onChangeText={(email) => setEmail(email)}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder='Password'
                        placeholderTextColor="#fff"
                        onChangeText={(password) => setPassword(password)}
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry={true}
                    />
                </View>
                <TouchableOpacity onPress={() => loginUser(email, password)} style={styles.button}>
                    <Text style={{ fontWeight: 'bold', fontSize: 22, color: colors.white }}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Registeration')} style={{ marginTop: 20 }}>
                    <Text style={{ fontSize: 14, color: colors.white }}>Don't Have an Account Sign Up</Text>
                </TouchableOpacity> */}
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Image
                        source={imagePath.white_logo} // Replace with your logo image path
                        style={styles.logo}
                    />
                </TouchableOpacity>
                <Text style={styles.copyRightText}>© 2023 EcoBin. All Rights Reserved.</Text>
            </ImageBackground>
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    container: {
        // width: "75%",
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
        // marginTop: 100,
        // alignSelf:'center'
    },
    textInput: {
        paddingTop: 20,
        paddingBottom: 10,
        width: 300,
        fontSize: 20,
        borderBottomWidth: 1,
        borderBottomColor: colors.white,
        marginBottom: 10,
        textAlign: "center",
        color: colors.white
    },
    button: {
        marginTop: 50,
        height: 70,
        width: 250,
        backgroundColor: colors.themeColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        color: colors.white
    },
    imageContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
    },
    imgStyle: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    copyRightText: {
        marginLeft: 10,
        color: colors.white,
        fontSize: 15,
    }
})