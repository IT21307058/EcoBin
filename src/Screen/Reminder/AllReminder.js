import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { scale, moderateVerticalScale, moderateScale } from 'react-native-size-matters';
import imagePath from '../../constants/imagePath';
import colors from '../../styles/color';
import { useNavigation } from '@react-navigation/native';
import { ref, onValue } from 'firebase/database';
import { db } from '../../../config';


const AllReminder = () => {
  const navigation = useNavigation();

  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  

  useEffect(() => {
    const reminderRef = ref(db, 'reminder');
    onValue(reminderRef, (snapshot) => {
      const dataFromDB = snapshot.val();
      if (dataFromDB) {
        const dataArray = Object.keys(dataFromDB).map((key) => ({
          id: key,
          ...dataFromDB[key],
        }));
        setData(dataArray);
      }
    });
  }, []);

  const handleSingleItem = (item) => {
    navigation.navigate('OneReminder', { item });
  };

  const handleImagePress1 = () => {
    // Navigate to the 'AddGoal' screen when the image is pressed
    navigation.navigate('AddReminder');
};

  const filteredData = data.filter((item) => {
    const normalizedQuery = searchQuery.toLowerCase();
    return item.name.toLowerCase().includes(normalizedQuery);
  });

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => handleSingleItem(item)}>
        <View style={styles.itemContainer}>
          <Text style={styles.title}>Reminder: {item.name}</Text>
          <Text style={styles.body}>Days: {item.days}</Text>
          <Text style={styles.body}>Time: {item.time}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={imagePath.background} style={styles.imgStyle}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.headerStyle}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={imagePath.backarrow} />
            </TouchableOpacity>
            <Image source={imagePath.bell} />
          </View>
          <Text style={styles.ReminderHeaderTextStyle}>Your Reminders</Text>
        </SafeAreaView>
      </ImageBackground>
      <View style={{ marginTop: moderateVerticalScale(14), marginHorizontal: moderateScale(16), flex: 1 }}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
        <FlatList
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ marginBottom: moderateVerticalScale(16) }} />}
          data={filteredData}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
        <TouchableOpacity style={styles.AddButton} onPress={handleImagePress1}>
                    <View>
                        <Image source={imagePath.addbtn} style={styles.AddIconImage} />
                    </View>
                </TouchableOpacity>
      </View>
    </View>
  );
};

export default AllReminder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgStyle: {
    height: 200,
    width: '100%',
  },
  ReminderHeaderTextStyle: {
    fontSize: scale(32),
    color: 'white',
    fontWeight: 'bold',
    marginLeft: moderateScale(70),
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
    paddingHorizontal: moderateScale(16),
  },
  itemContainer: {
    padding: moderateScale(16),
    backgroundColor: 'white',
    borderRadius: moderateScale(10),
    marginBottom: moderateVerticalScale(16),
  },
  title: {
    fontSize: scale(18),
    fontWeight: 'bold',
  },
  body: {
    fontSize: scale(16),
    marginTop: moderateVerticalScale(8),
  },
  searchInput: {
    width: '80%',
    height: moderateVerticalScale(40),
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: moderateScale(5),
    paddingLeft: moderateScale(10),
    fontSize: moderateScale(16),
    backgroundColor: 'white',
    marginBottom: moderateVerticalScale(28),
    alignSelf: 'center',
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
        alignItems:'center',
        justifyContent:'center'
    },
    AddIconImage: {
        width: 50,
        height: 50,
        // backgroundColor:"#fff",
        // color:"#fff"
        /// committed 
    },
});
