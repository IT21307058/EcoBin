import { StyleSheet, Text, View, ImageBackground, SafeAreaView,TextInput, FlatList, Button, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import imagePath from '../../constants/imagePath';
// import dummyData from './dummyData';
import ButtonComp from '../../Components/ButtonComp';
import colors  from '../../styles/color';
import { useNavigation } from '@react-navigation/native'
import { CheckBox } from 'react-native-elements';



import { db } from '../../../config';
import { ref, onValue, remove } from 'firebase/database'

const AllGoal = () => {
    const navigation = useNavigation();

    const navigateToBack = () => {
        navigation.goBack();
    }

    const [checkedItems, setCheckedItems] = useState({});

    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    // const handleItemPress = (item) => {
    //     // Navigate to the desired page with the item data
    //     navigation.navigate('OnePost', { item });
    // };

    const handleImagePress1 = () => {
        // Navigate to the 'AddGoal' screen when the image is pressed
        navigation.navigate('AddGoal');
    };

    useEffect(() => {
        // Use the Firebase Realtime Database reference to listen for data changes
        const goalRef = ref(db, 'goal');
        onValue(goalRef, (snapshot) => {
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

    const handleUpdateItem = (item) => {
        // Navigate to the update page with the item data
        navigation.navigate('OneGoal', { item });
    };

    

    const filteredData = data.filter((item) => {
        // Filter the data based on the search query
        const normalizedQuery = searchQuery.toLowerCase();
        return item.name.toLowerCase().includes(normalizedQuery) ;
    });



    const renderItem = ({ item }) => {
        const isChecked = checkedItems[item.id] || false;
      
        const handleCheckboxChange = () => {
          setCheckedItems((prev) => ({
            ...prev,
            [item.id]: !isChecked,
          }));
        };
      
        return (
          <TouchableOpacity onPress={() => handleUpdateItem(item)}>
            <View style={styles.itemContainer}>
              <View style={{ flexDirection: 'column' }}>
                <Text style={styles.title}>Goal: {item.name}</Text>
                <Text style={styles.body}>Date: {item.date}</Text>
              </View>
              <CheckBox
                checked={isChecked}
                onPress={handleCheckboxChange}
                containerStyle={styles.checkboxContainer}
                checkedColor={colors.themeColor}
              />
            </View>
          </TouchableOpacity>
        );
      };
    

  

    return (
        <View style={styles.container}>
            <ImageBackground
                source={imagePath.background}
                style={styles.imgStyle}
            >
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={styles.headerStyle}>
                    <TouchableOpacity onPress={navigateToBack}>
                        <Image source={imagePath.backarrow} />
                    </TouchableOpacity>
                        <Image source={imagePath.bell} />
                    </View>
                    <Text style={styles.GoalHeaderTextStyle}> Set Your Goals </Text>
                </SafeAreaView>
            </ImageBackground>
            <View style={{
                marginTop: moderateVerticalScale(14),
                marginHorizontal: moderateScale(16),
                flex: 1
            }}>
                {/* <FlatList
                    showsVerticalScrollIndicator={false}
                    // data={dummyData}
                    renderItem={renderItem}
                    ItemSeparatorComponent={() => <View style={{ marginBottom: moderateVerticalScale(16) }} />}
                /> */}
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
                {/* <FlatList
                    showsVerticalScrollIndicator={false}
                    // data={dummyData}
                    ItemSeparatorComponent={() => <View style={{ marginBottom: moderateVerticalScale(16) }} />}
                    data={filteredData}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => handleSingleItem(item)}>
                            <View style={styles.itemContainer}>
                                <CheckBox value={isChecked} onValueChange={handleCheckboxChange} />
                                <Text style={styles.body}>{item.name}</Text>
                                
                            </View>
                        </TouchableOpacity>
                    )}
                /> */}
                <TouchableOpacity style={styles.AddButton} onPress={handleImagePress1}>
                    <View>
                        <Image source={imagePath.addbtn} style={styles.AddIconImage} />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default AllGoal

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
    GoalHeaderTextStyle: {
        fontSize: scale(32),
        color: 'white',
        fontWeight: 'bold',
        marginLeft: 70
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
        alignItems:'center',
        justifyContent:'center'
    },
    AddIconImage: {
        width: 50,
        height: 50,
        // backgroundColor:"#fff",
        // color:"#fff"
    },
    itemContainer: {
        flexDirection: 'row', // Align items horizontally
    justifyContent: 'space-between', // Space between checkbox and text
    alignItems: 'center', // Center items vertically
        borderBottomWidth: 1,
        borderColor: '#ddd',
        padding: 10,backgroundColor: 'white',
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
      alignSelf:"center"
    }
})