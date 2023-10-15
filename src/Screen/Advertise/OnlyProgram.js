import { StyleSheet, Text, View, ImageBackground, SafeAreaView, TextInput, FlatList, Button, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import imagePath from '../../constants/imagePath';
// import dummyData from './dummyData';
import ButtonComp from '../../Components/ButtonComp';
import colors from '../../styles/color';
import { useNavigation } from '@react-navigation/native'
// import { TouchableOpacity } from 'react-native-gesture-handler';

import { db } from '../../../config';
import { ref, onValue, remove } from 'firebase/database'

const OnlyProgram = () => {

  const navigation = useNavigation();

  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // const handleImagePress = () => {
  //     // Navigate to the 'UpdateAdvertise' screen when the image is pressed
  //     navigation.navigate('AllCommunity');
  // };

  useEffect(() => {
    // Use the Firebase Realtime Database reference to listen for data changes
    const advertiseRef = ref(db, 'advertise');
    onValue(advertiseRef, (snapshot) => {
      const dataFromDB = snapshot.val();
      if (dataFromDB) {
        // Convert the data from an object to an array of items
        const dataArray = Object.keys(dataFromDB).map((key) => ({
          id: key,
          ...dataFromDB[key],
        }));
        setData(dataArray);
      }
    });
  }, []);

  const handleSingleItem = (item) => {
    // Navigate to the update page with the item data
    navigation.navigate('OneAdvertise', { item });
  };

  // const handleUpdate = (item) => {
  //     // Navigate to the update page with the item data
  //     navigation.navigate('UpdateAdvertise', { item });
  // };

  // const handleDelete = (itemId) => {
  //     // Remove the item from Firebase Realtime Database
  //     const advertiseRef = ref(db, 'advertise/' + itemId);
  //     remove(advertiseRef)
  //         .then(() => {
  //             console.log('Advertise deleted successfully');
  //             // You can also update the state to remove the deleted item from the list
  //         })
  //         .catch((error) => {
  //             console.error('Error deleting advertise:', error);
  //         });
  // };

  const filteredData = data.filter((item) => {
    // Filter the data based on the search query
    const normalizedQuery = searchQuery.toLowerCase();
    // return item.advertiseType.toLowerCase().includes(normalizedQuery) || item.topic.toLowerCase().includes(normalizedQuery) || item.description.toLowerCase().includes(normalizedQuery);

    return (
      item.advertiseType.toLowerCase() === 'program' &&
      (item.advertiseType.toLowerCase().includes(normalizedQuery) ||
        item.topic.toLowerCase().includes(normalizedQuery) ||
        item.description.toLowerCase().includes(normalizedQuery))
    );
  });

  // const handleImagePress1 = () => {
  //     // Navigate to the 'UpdateAdvertise' screen when the image is pressed
  //     props.navigation.navigate('AddAdvertise');
  // };

  // const renderItem = ({ item }) => {
  //     return (
  //         <View style={styles.flatStyle}>
  //             <View style={styles.flexView}>
  //                 <View>
  //                     {/* <Text style={{
  //                             fontSize: scale(12),
  //                             color: colors.blackOpacity80
  //                         }}>{item?.date}</Text> */}
  //                     <Text style={{
  //                         fontSize: scale(12),
  //                         color: colors.black,
  //                         fontWeight: 'bold',
  //                         marginTop: moderateVerticalScale(8)
  //                     }}>{item?.name}</Text>

  //                     <View style={{
  //                         flexDirection: 'row',
  //                         alignItems: 'center'
  //                     }}>
  //                         <Image style={{
  //                             width: moderateScale(14),
  //                             height: moderateScale(14),
  //                             tintColor: colors.blackOpacity50
  //                         }} source={imagePath.bluebell} />
  //                         <Text style={{
  //                             fontSize: scale(12),
  //                             color: colors.blackOpacity50,
  //                         }}> {item?.address}</Text>
  //                     </View>
  //                 </View>
  //                 <Image source={{
  //                     uri: 'https://cdn.dribbble.com/users/1162077/screenshots/7475318/media/8837a0ae1265548e27a2b2bb3ab1f366.png?compress=1&resize=400x300'
  //                 }}
  //                     style={{
  //                         width: moderateScale(64),
  //                         height: moderateScale(64),
  //                         borderRadius: moderateScale(32)
  //                     }}
  //                 />
  //             </View>
  //             <View style={{ ...styles.flexView, marginVertical: moderateVerticalScale(8) }}>
  //                 <Text style={{
  //                     fontSize: moderateScale(14),
  //                     color: colors.blackOpacity50,
  //                     textTransform: 'uppercase'

  //                 }}>Price</Text>
  //                 <Text style={{
  //                     fontSize: scale(14),
  //                     color: colors.black,
  //                     fontWeight: 'bold',
  //                 }}>{item?.price}</Text>
  //             </View>

  //             <View style={styles.flexView}>
  //                 <View style={{ flex: 1 }}>
  //                     <ButtonComp
  //                         btnText={'View'}
  //                         btnStyle={{
  //                             backgroundColor: colors.white,
  //                             borderWidth: 1,
  //                             borderColor: colors.themeColor,
  //                         }}
  //                         btnTextStyle={{ color: colors.themeColor }}
  //                         onPress={() => navigation.navigate('AddAdvertise')}
  //                     />
  //                 </View>
  //                 <View style={{ marginHorizontal: moderateScale(8) }} />
  //                 <View style={{ flex: 1 }}>
  //                     <ButtonComp
  //                         btnText={'Edit'}
  //                         onPress={() => navigation.navigate('UpdateAdvertise')}
  //                     />
  //                 </View>
  //             </View>
  //         </View>
  //     )
  // }

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
          <Text style={styles.AdvertiseTextStyle}>Explore</Text>
        </SafeAreaView>
      </ImageBackground>
      <View style={{
        marginTop: moderateVerticalScale(14),
        marginHorizontal: moderateScale(16),
        flex: 1
      }}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
        <FlatList
          showsVerticalScrollIndicator={false}
          // data={dummyData}
          ItemSeparatorComponent={() => <View style={{ marginBottom: moderateVerticalScale(16) }} />}
          data={filteredData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSingleItem(item)}>
              <View style={styles.itemContainer}>
                <Text style={styles.title}>{item.advertiseType}</Text>
                <Text style={styles.body}>{item.topic}</Text>
                <Text style={styles.body}>{item.description}</Text>
                {/* <TouchableOpacity onPress={() => handleUpdate(item)}>
                                    <Text style={styles.updateButton}>Update</Text>
                                </TouchableOpacity> */}
                {/* <TouchableOpacity onPress={() => handleDelete(item.id)}>
                                    <Text style={styles.deleteButton}>Delete</Text>
                                </TouchableOpacity> */}
              </View>
            </TouchableOpacity>
          )}
        />
        <TouchableOpacity style={styles.AddButton} onPress={() => navigation.navigate('AddAdvertise')}>
          <View>
            <Image source={imagePath.addbtn} style={styles.AddIconImage} />
          </View>
        </TouchableOpacity>

      </View>
    </View>
  )
}

export default OnlyProgram

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    borderBottomWidth: 1,
    borderColor: '#ddd',
    padding: 10, backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  body: {
    fontSize: 16,
    marginTop: 8,
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
  }
})