import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import ButtonComp from "../../Components/ButtonComp";
import colors from "../../styles/color";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import { db } from "../../../config";
import { ref, onValue, remove } from "firebase/database";
import imagePath from "../../constants/imagePath";

const BlogHome = (props) => {
  const navigation = useNavigation();

  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const DESCRIPTION_CHARACTER_LIMIT = 30;

  const formatDate = (dateString) => {
    const date = moment(dateString);
    return date.format("YYYY/MM/DD");
  };

  useEffect(() => {
    // Use the Firebase Realtime Database reference to listen for data changes
    const blogRef = ref(db, "blogs");
    onValue(blogRef, (snapshot) => {
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
    navigation.navigate("OneBlog", { item });
  };

  const handleSeeMore = (item) => {
    // Navigate to the detailed view of the selected blog item
    navigation.navigate("DetailedBlogView", { item });
  };
  

  const filteredData = data.filter((item) => {
    // Filter the data based on the search query
    const normalizedQuery = searchQuery.toLowerCase();
    return (
      item.topic.toLowerCase().includes(normalizedQuery) ||
      item.body.toLowerCase().includes(normalizedQuery)
    );
  });

  return (
    <View style={styles.container}>
      <ImageBackground source={imagePath.background} style={styles.imgStyle}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.headerStyle}>
            <Image source={imagePath.backarrow} />
            <TouchableOpacity>
              <Image source={imagePath.bell} />
            </TouchableOpacity>
          </View>
          <Text style={styles.BlogTextStyle}>Blogs</Text>
        </SafeAreaView>
      </ImageBackground>
      <View
        style={{
          marginTop: 14,
          marginHorizontal: 16,
          flex: 1,
        }}
      >
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
        <FlatList
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ marginBottom: 16 }} />}
          data={filteredData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSingleItem(item)}>
              <View style={styles.itemContainer}>
                <View>
                  <Text style={styles.title}>{item.topic}</Text>
                  <Text style={styles.body}>
                    {item.body.length > DESCRIPTION_CHARACTER_LIMIT
                      ? `${item.body.slice(0, DESCRIPTION_CHARACTER_LIMIT)}... `
                      : item.body}
                    {item.body.length > DESCRIPTION_CHARACTER_LIMIT && (
                      <Text
                        style={{ color: "blue" }}
                        onPress={() => handleSeeMore(item)}
                      >
                        See More
                      </Text>
                    )}
                  </Text>
                </View>
                <View style={{ alignItems: "flex-end" }}>
                  <Text style={styles.date}>{formatDate(item.date)}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
        <TouchableOpacity
          style={styles.AddButton}
          onPress={() => navigation.navigate("AddBlog")}
        >
          <View>
            <Image source={imagePath.addbtn} style={styles.AddIconImage} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BlogHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgStyle: {
    height: 200,
    width: "100%",
  },
  BlogTextStyle: {
    fontSize: 32,
    color: "white",
    fontWeight: "bold",
    marginLeft: 145,
  },
  headerStyle: {
    paddingVertical: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    paddingHorizontal: 16,
  },
  AddButton: {
    width: 50,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 100,
    display: "flex",
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
    alignItems: "center",
    justifyContent: "center",
  },
  AddIconImage: {
    width: 50,
    height: 50,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.themeColor,
  },
  body: {
    fontSize: 15,
    marginTop: 8,
    color: colors.blackOpacity80,
  },
  searchInput: {
    width: "80%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    fontSize: 16,
    backgroundColor: "white",
    marginBottom: 28,
    alignSelf: "center",
  },
  date: {
    color: colors.blackOpacity50,
  },
});
