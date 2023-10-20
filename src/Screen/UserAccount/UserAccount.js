import { StyleSheet, Text, View, TextInput, SafeAreaView, ImageBackground, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
// import { useNavigation } from '@react-navigation/native';
import { firebase } from '../../../config'
import imagePath from '../../constants/imagePath';
import colors from '../../styles/color';
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import ButtonComp from '../../Components/ButtonComp';



const UserAccount = () => {
  const [name, setName] = useState("");

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setName(snapshot.data());
        } else {
          console.log("User does not exist");
        }
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>

      <ImageBackground
        source={imagePath.background}
        style={styles.imgStyle}
      >

        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.headerStyle}>
            <TouchableOpacity>
              <Image source={imagePath.backarrow} />
            </TouchableOpacity>
            <Image source={imagePath.bell} />
          </View>
          <Text style={styles.AdvertiseTextStyle}>User Account</Text>
        </SafeAreaView>
      </ImageBackground>


      <View style={{
        backgroundColor: colors.borderColor,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        width: '90%',
        alignSelf: "center",
        padding: moderateScale(15),
        borderRadius: moderateScale(20),
        paddingHorizontal: moderateScale(24),
        paddingTop: moderateVerticalScale(44),
        marginTop: 40
      }}>
        {/* <Text style={styles.label}>Advertise Type:</Text>
    <Text style={styles.value}>{advertiseType}</Text> */}


        <Text style={styles.label}>First Name:</Text>
        <Text style={styles.value}>{name.firstName}</Text>

        <Text style={styles.label}>Last Name:</Text>
        <Text style={styles.value}>{name.lastName}</Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{name.email}</Text>

        <ButtonComp
          btnText={'Log Out'}
          onPress={() => { firebase.auth().signOut() }}
        />

        {/* <TouchableOpacity onPress={() => { firebase.auth().signOut() }} style={styles.button}>
          <Text style={{ fontWeight: 'bold', fontSize: 22, color:colors.white }}>Sign Out</Text>
        </TouchableOpacity> */}
      </View>
      <TouchableOpacity>
        <Text style={{ color: "#FFD700", alignSelf: "center", marginTop: 20, fontSize: 20, fontWeight: "bold" }}>Become a Premium Member</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default UserAccount;

const styles = StyleSheet.create({
  container: {

    flex: 1
  },
  imgStyle: {
    height: 200,
    width: '100%',

    // justifyContent: 'center',
    // alignItems: 'center'
  },
  AdvertiseTextStyle: {
    fontSize: scale(25),

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
  },
  flatStyle: {
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    padding: moderateScale(16),
    borderRadius: moderateScale(4),

    margin: 2
  },
  flexView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  AddButton: {
    width: 50,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 100,

    display: 'flex',
    bottom: 0,
    right: 0,
    position: "absolute",
    marginRight: 25,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,

    alignItems: 'center',
    justifyContent: 'center'
  },
  AddIconImage: {
    width: 50,
    height: 50,
    // backgroundColor:"#fff",
    // color:"#fff"
  },
  itemContainer: {

    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    padding: 10, backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,

    fontWeight: 'bold',
    color: colors.themeColor
  },
  body: {
    fontSize: 15,
    marginTop: 8,

    color: colors.blackOpacity80
  },
  searchInput: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    fontSize: 16,

    backgroundColor: 'white', // Background color
    marginBottom: 28,
    alignSelf: "center"
  },
  date: {
    // marginLeft: 240,
    color: colors.blackOpacity50
  },
  commentcontainer: {
    height: 40,
    width: 40
  },
  textInput: {
    paddingTop: 20,
    paddingBottom: 10,
    width: 400,
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    marginBottom: 10,
    textAlign: "center",
  },
  button: {
    marginTop: 50,
    height: 70,
    width: 250,

    backgroundColor: '#026efd',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.blackOpacity30
  },
  value: {
    fontSize: 20,
    marginBottom: 10,

  }
})
