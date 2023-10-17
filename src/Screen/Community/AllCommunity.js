import { StyleSheet, Text, View, ImageBackground, SafeAreaView, TextInput, FlatList, Button, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import imagePath from '../../constants/imagePath';
// import dummyData from './dummyData';
import ButtonComp from '../../Components/ButtonComp';
import colors from '../../styles/color';
import { useNavigation } from '@react-navigation/native'

import { db } from '../../../config';
import { ref, onValue, remove, set } from 'firebase/database'
import moment from 'moment';

const AllCommunity = () => {
    const navigation = useNavigation();

    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const DESCRIPTION_CHARACTER_LIMIT = 20;

    // const handleItemPress = (item) => {
    //     // Navigate to the desired page with the item data
    //     navigation.navigate('OnePost', { item });
    // };

    const formatDate = (dateString) => {
        const date = moment(dateString);
        return date.format('YYYY/MM/DD');
    };

    const handleImagePress1 = () => {
        // Navigate to the 'UpdateAdvertise' screen when the image is pressed
        navigation.navigate('AddPost');
    };

    // const handleLike = (item) => {
    //     const postId = item.id; // Get the unique post identifier

    //     // Create a reference for the likes count of the specific post in a separate database (communityLikes)
    //     const communityLikesRef = ref(db, `communityLikes/${item.id}`);

    //     // Get the current number of likes for the post
    //     const currentLikes = item.likes || 0;

    //     // Increment the likes count by 1
    //     const newLikes = currentLikes + 1;

    //     // Update the likes count for the specific post in the communityLikes database
    //     set(communityLikesRef, newLikes)
    //         .then(() => {
    //             // Successfully updated the likes count for the post
    //             console.log(`Likes updated successfully for post ${postId}`);
    //         })
    //         .catch((error) => {
    //             // Handle the error, if any
    //             console.error(`Error updating likes for post ${postId}:`, error);
    //         });
    // };

    useEffect(() => {
        // Use the Firebase Realtime Database reference to listen for data changes
        const communityRef = ref(db, 'community');
        onValue(communityRef, (snapshot) => {
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

    // const handleLike = (item) => {
    //     // Ensure 'likes' is a valid number or initialize it with 0
    //     const newLikes = isNaN(item.likes) ? 0 : item.likes + 1;

    //     // Update the like count for the post in the database
    //     const postRef = ref(db, `community/${item.id}`);
    //     set(postRef, {
    //         likes: newLikes,
    //     });
    // };

    const handleSingleItem = (item) => {
        // Navigate to the update page with the item data
        navigation.navigate('OnePost', { item });
    };

    const handleFeedback = (item) => {
        // Navigate to the update page with the item data
        navigation.navigate('FeedbackPage', { item });
    };

    const filteredData = data.filter((item) => {
        // Filter the data based on the search query
        const normalizedQuery = searchQuery.toLowerCase();
        // return item.topic.toLowerCase().includes(normalizedQuery) || item.description.toLowerCase().includes(normalizedQuery);
        // Check if 'item.communityType', 'item.topic', and 'item.description' exist before using toLowerCase()
        // const communityType = item.communityType ? item.communityType.toLowerCase() : '';
        // const topic = item.topic ? item.topic.toLowerCase() : '';
        // const description = item.description ? item.description.toLowerCase() : '';

        // return (
        //     communityType === 'residential users' &&
        //     (communityType.includes(normalizedQuery) ||
        //         topic.includes(normalizedQuery) ||
        //         description.includes(normalizedQuery))
        // );

        return (
            item.communityType.toLowerCase() === 'residential users' &&
            (item.communityType.toLowerCase().includes(normalizedQuery) ||
                item.topic.toLowerCase().includes(normalizedQuery) ||
                item.description.toLowerCase().includes(normalizedQuery))
        );
    });



    return (
        <View style={styles.container}>
            <ImageBackground
                source={imagePath.background}
                style={styles.imgStyle}
            >
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={styles.headerStyle}>
                        <TouchableOpacity onPress={() => navigation.navigate('CommunityHome')}>
                            <Image source={imagePath.backarrow} />
                        </TouchableOpacity>
                        <Image source={imagePath.bell} />
                    </View>
                    <Text style={styles.AdvertiseTextStyle}>Residential User</Text>
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
                    // data={dummyData}
                    ItemSeparatorComponent={() => <View style={{ marginBottom: moderateVerticalScale(16) }} />}
                    data={filteredData}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => handleSingleItem(item)}>
                            <View style={styles.itemContainer}>
                                {/* <Text style={styles.title}>{item.advertiseType}</Text> */}
                                {/* <Text style={styles.title}>{item.topic}</Text>
                                <Text style={styles.body}>{item.description}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'space-between' }}>
                                    <Image source={imagePath.roundcomment} style={styles.AddIconImage} />
                                    <Text style={styles.date}>{formatDate(item.date)}</Text>
                                </View> */}
                                {/* <View style={{ flex: 1 }}> */}
                                <View>
                                    <Text style={styles.title}>{item.topic}</Text>
                                    {/* <Text style={styles.body}>{item.description}</Text> */}
                                    <Text style={styles.body}>
                                        {item.description.length > DESCRIPTION_CHARACTER_LIMIT
                                            ? `${item.description.slice(0, DESCRIPTION_CHARACTER_LIMIT)}... `
                                            : item.description}
                                        {item.description.length > DESCRIPTION_CHARACTER_LIMIT && (
                                            <Text style={{ color: 'blue' }} onPress={() => handleSeeMore(item)}>
                                                See More
                                            </Text>
                                        )}
                                    </Text>
                                </View>
                                <View style={{ alignItems: 'flex-end' }}>
                                    <TouchableOpacity onPress={() => handleFeedback(item)}>
                                        <Image source={imagePath.roundcomment} style={styles.commentcontainer} />
                                    </TouchableOpacity>
                                    <Text style={styles.date}>{formatDate(item.date)}</Text>
                                </View>
                                {/* </View> */}
                                {/* <Text style={styles.date}>{formatDate(item.date)}</Text> */}
                                {/* <View>
                                    <TouchableOpacity onPress={() => handleLike(item)}>
                                        <Text name="thumbs-up" size={20} color="blue">Like</Text>
                                    </TouchableOpacity>
                                    <Text>{item.likes || 0}</Text>
                                </View> */}
                                {/* <TouchableOpacity onPress={() => handleLike(item)}>
                                    <Text style={styles.likeButton}>Like ({item.likes})</Text>
                                </TouchableOpacity> */}
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
                <TouchableOpacity style={styles.AddButton} onPress={handleImagePress1}>
                    <View>
                        <Image source={imagePath.addbtn} style={styles.AddIconImage} />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default AllCommunity

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
    }
})