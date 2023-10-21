import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ImageBackground } from 'react-native'
import React, { useState } from 'react'
// import { useNavigation } from '@react-navigation/native';
import { firebase } from '../../../config'
import colors from '../../styles/color';
import imagePath from '../../constants/imagePath';

const Registeration = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    registerUser = async (email, password, firstName, lastName) => {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                firebase.auth().currentUser.sendEmailVerification({
                    handleCodeInApp: true,
                    url: 'https://realtimeexpo2.firebaseapp.com',
                })
                    .then(() => {
                        alert('Verification email sent')
                    }).catch((error) => {
                        alert(error.message)
                    })
                    .then(() => {
                        firebase.firestore().collection('users')
                            .doc(firebase.auth().currentUser.uid)
                            .set({
                                firstName,
                                lastName,
                                email,
                            })
                    })
                    .catch((error) => {
                        alert(error.message)
                    })
            })
            .catch((error => {
                alert(error.message)
            }))
    }



    return (
        <View style={styles.container}>
            <ImageBackground
                source={imagePath.background}
                style={styles.imgStyle}
            >
                <Text style={{ fontWeight: 'bold', fontSize: 40, color: colors.white }}>Register</Text>

                <View style={{ marginTop: 40 }}>
                    <TextInput
                        style={styles.textInput}
                        placeholder='firstName'
                        placeholderTextColor="#fff"
                        onChangeText={(firstName) => setFirstName(firstName)}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder='lastName'
                        placeholderTextColor="#fff"
                        onChangeText={(lastName) => setLastName(lastName)}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder='Email'
                        placeholderTextColor="#fff"
                        onChangeText={(email) => setEmail(email)}
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType='email-address'
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
                <TouchableOpacity onPress={() => registerUser(email, password, firstName, lastName)} style={styles.button}>
                    <Text style={{ fontWeight: 'bold', fontSize: 22, color: colors.white }}>Register</Text>
                </TouchableOpacity>
                <Image
                    source={imagePath.white_logo} // Replace with your logo image path
                    style={styles.logo}
                />
                <Text style={styles.copyRightText}>© 2023 EcoBin. All Rights Reserved.</Text>
                {/* <TouchableOpacity onPress={() => navigation.navigate('Registeration')} style={{ marginTop: 20 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Registeration</Text>
            </TouchableOpacity> */}
            </ImageBackground>
        </View>
    )
}

export default Registeration

const styles = StyleSheet.create({
    // container: {
    //     flex: 1,
    //     alignItems: 'center',
    //     marginTop: 100
    // },
    // textInput: {
    //     paddingTop: 20,
    //     paddingBottom: 10,
    //     width: 400,
    //     fontSize: 20,
    //     borderBottomWidth: 1,
    //     borderBottomColor: '#000',
    //     marginBottom: 10,
    //     textAlign: "center"
    // },
    // button: {
    //     marginTop: 50,
    //     height: 70,
    //     width: 250,
    //     backgroundColor: '#026efd',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     borderRadius: 50
    // }
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
        color:colors.white
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