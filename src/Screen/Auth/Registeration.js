import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
// import { useNavigation } from '@react-navigation/native';
import { firebase } from '../../../config'

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
            <Text style={{ fontWeight: 'bold', fontSize: 26 }}>Registeration</Text>

            <View style={{ marginTop: 40 }}>
                <TextInput
                    style={styles.textInput}
                    placeholder='firstName'
                    onChangeText={(firstName) => setFirstName(firstName)}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder='lastName'
                    onChangeText={(lastName) => setLastName(lastName)}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder='Email'
                    onChangeText={(email) => setEmail(email)}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType='email-address'
                />
                <TextInput
                    style={styles.textInput}
                    placeholder='Password'
                    onChangeText={(password) => setPassword(password)}
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                />
            </View>
            <TouchableOpacity onPress={() => registerUser(email, password, firstName, lastName)} style={styles.button}>
                <Text style={{ fontWeight: 'bold', fontSize: 22 }}>Login</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={() => navigation.navigate('Registeration')} style={{ marginTop: 20 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Registeration</Text>
            </TouchableOpacity> */}
        </View>
    )
}

export default Registeration

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 100
    },
    textInput: {
        paddingTop: 20,
        paddingBottom: 10,
        width: 400,
        fontSize: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        marginBottom: 10,
        textAlign: "center"
    },
    button: {
        marginTop: 50,
        height: 70,
        width: 250,
        backgroundColor: '#026efd',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50
    }
})