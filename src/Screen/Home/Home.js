import { StyleSheet, Text, View, ImageBackground, SafeAreaView, TextInput, FlatList, Button, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import imagePath from '../../constants/imagePath';
// import dummyData from './dummyData';
import ButtonComp from '../../Components/ButtonComp';
import colors from '../../styles/color';
import { useNavigation } from '@react-navigation/native'
// import { TouchableOpacity } from 'react-native-gesture-handler';
//bhanuka

const Home = (props) => {
  const navigation = useNavigation();

  const navigationToGoals = () => {
    navigation.navigate('AllGoal');
  };
  const navigationToReminders = () => {
    navigation.navigate('AllReminder');
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
            <TouchableOpacity>
              <Image source={imagePath.bell} />
            </TouchableOpacity>
          </View>
          <Text style={styles.AdvertiseTextStyle}>Home</Text>
        </SafeAreaView>
      </ImageBackground>
      <View style={styles.cardContainer}>
        <View style={styles.row}>
          <TouchableOpacity style={styles.card}>
            <Image source={imagePath.event} />
            <Text style={styles.cardText}>Events</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card} onPress={navigationToGoals}>
            <Image source={imagePath.goal} />
            <Text style={styles.cardText}>Goals</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.card} onPress={navigationToReminders}>
            <Image source={imagePath.reminder} />
            <Text style={styles.cardText}>Reminders</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card}>
            <Image source={imagePath.foodswap} />
            <Text style={styles.cardText}>Food Swap</Text>
          </TouchableOpacity>
        </View>
      </View>

    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgStyle: {
    height: 200,
    width: '100%',
  },
  AdvertiseTextStyle: {
    fontSize: scale(32),
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 145
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16
  },
  card: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 20,
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardContainer:{
    marginTop:50,
    paddingHorizontal: 40
  }
})