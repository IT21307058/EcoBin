import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import ButtonComp from "../../Components/ButtonComp";
import colors from "../../styles/color";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../../config";
import { ref, set, push } from "firebase/database";
import imagePath from "../../constants/imagePath";

const AddBlog = () => {
  const navigation = useNavigation();
  const [topic, setTopic] = useState("");
  const [body, setBody] = useState("");

  const dataAddOn = () => {
    const blogRef = ref(db, "blogs");
    const newBlogRef = push(blogRef);
    set(newBlogRef, {
      topic: topic,
      body: body,
    })
      .then(() => {
        console.log("Blog added successfully");
        setTopic("");
        setBody("");
      })
      .catch((error) => {
        console.error("Error adding blog:", error);
      });
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <View style={styles.headerStyle}>
          <TouchableOpacity onPress={() => navigation.navigate("BlogHome")}>
            <Image source={imagePath.bluearrow} />
          </TouchableOpacity>
          <Image source={imagePath.bluebell} />
        </View>
        <View style={styles.content}>
          <Text style={styles.headerText}>Create Blog</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Topic"
              placeholderTextColor="lightgray"
              value={topic}
              onChangeText={(text) => setTopic(text)}
              style={styles.input}
            />
            <TextInput
              placeholder="Body"
              placeholderTextColor="lightgray"
              value={body}
              onChangeText={(text) => setBody(text)}
              multiline={true}
              numberOfLines={10}
              textAlignVertical="top"
              style={[styles.input, styles.bodyInput]}
            />
            <ButtonComp btnText={"Publish"} onPress={dataAddOn} />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  headerText: {
    textTransform: "uppercase",
    fontSize: 24,
    fontWeight: "bold",
    color: colors.themeColor,
    marginVertical: 24,
  },
  headerStyle: {
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  inputContainer: {
    backgroundColor: colors.borderColor,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    width: "100%",
    padding: 20,
    borderRadius: 20,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 12,
    marginBottom: 24,
    fontSize: 16,
  },
  bodyInput: {
    height: 200,
    textAlignVertical: "top",
  },
});

export default AddBlog;


