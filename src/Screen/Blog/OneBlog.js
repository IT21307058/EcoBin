import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from "react-native";
import ButtonComp from "../../Components/ButtonComp";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../../config";
import { ref, remove } from "firebase/database";
import imagePath from "../../constants/imagePath";

const OneBlog = ({ route }) => {
  const navigation = useNavigation();

  const { item } = route.params; // Get the item data passed from the previous screen

  const handleUpdate = (item) => {
    // Navigate to the update page with the item data
    navigation.navigate("UpdateBlog", { item });
  };

  const handleDelete = (itemId) => {
    // Remove the item from Firebase Realtime Database
    const blogRef = ref(db, "blogs/" + itemId);
    remove(blogRef)
      .then(() => {
        console.log("Blog deleted successfully");
        Alert.alert("Blog deleted successfully", null, [
          {
            text: "OK",
            onPress: () => navigation.navigate("BlogHome"),
            style: "cancel",
          },
        ]);
        // You can also update the state to remove the deleted item from the list
      })
      .catch((error) => {
        console.error("Error deleting blog:", error);
      });
  };

  return (
    <ImageBackground
      source={imagePath.background}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <SafeAreaView style={styles.container}>
          <View style={styles.headerStyle}>
            <TouchableOpacity onPress={() => navigation.navigate("BlogHome")}>
              <Image source={imagePath.bluearrow} />
            </TouchableOpacity>
            <Image source={imagePath.bluebell} />
          </View>
          <View style={styles.content}>
            <Text style={styles.headerText}>Edit Blog</Text>
            <View style={styles.card}>
              <Text style={styles.label}>Topic:</Text>
              <Text style={styles.value}>{item.topic}</Text>

              <Text style={styles.label}>Body:</Text>
              <Text style={styles.value}>{item.body}</Text>

              <ButtonComp
                btnText={"Update"}
                btnStyle={{ backgroundColor: "#32CD32" }} // green
                btnTextStyle={{ fontSize: 20 }} // increased font size
                onPress={() => handleUpdate(item)}
              />
              <Text />
              <ButtonComp
                btnText={"Delete"}
                btnStyle={{
                  backgroundColor: "#FF0000", // red
                  borderWidth: 1,
                  borderColor: "#FF0000",
                }}
                btnTextStyle={{ color: "#FFFFFF", fontSize: 20 }} // white, increased font size
                onPress={() => handleDelete(item.id)}
              />
            </View>
          </View>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  headerText: {
    textTransform: "uppercase",
    fontSize: 30, // increased font size
    fontWeight: "bold",
    color: "#0E86D4", // light blue
    marginVertical: 24,
  },
  headerStyle: {
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: "transparent", // transparent
    borderRadius: 10,
    padding: 16,
    width: "80%",
    alignSelf: "center",
  },
  label: {
    fontSize: 20, // increased font size
    fontWeight: "bold",
    color: "#0E86D4", // light blue
  },
  value: {
    fontSize: 24, // increased font size
    marginBottom: 10,
    color: "#FFFFFF", // white
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
});

export default OneBlog;
