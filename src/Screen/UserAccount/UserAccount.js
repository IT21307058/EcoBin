import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
// import { useNavigation } from '@react-navigation/native';
import { firebase } from '../../../config'

const UserAccount = () => {

  const [name, setName] = useState('')

  useEffect(() => {
    firebase.firestore().collection('users')
      .doc(firebase.auth().currentUser.uid).get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setName(snapshot.data())
        } else {
          console.log('User does not exist')
        }
      })
  }, [])

  return (
    <SafeAreaView>
      <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Hello, {name.firstName}</Text>

      <TouchableOpacity onPress={() => { firebase.auth().signOut() }} style={styles.button}>
        <Text style={{ fontWeight: 'bold', fontSize: 22 }}>Sign Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default UserAccount

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