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
      <SafeAreaView>
        <View style={styles.headerStyle}>
          <TouchableOpacity onPress={() => navigation.navigate("BlogHome")}>
            <Image source={imagePath.bluearrow} />
          </TouchableOpacity>
          <Image source={imagePath.bluebell} />
        </View>
        <View style={{ marginTop: 50, alignSelf: "center" }}>
          <Text style={styles.headerText}>Create Blog</Text>
        </View>
        <View
          style={{
            backgroundColor: colors.borderColor,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            width: "75%",
            alignSelf: "center",
            padding: 15,
            borderRadius: 20,
            paddingHorizontal: 24,
            paddingTop: 44,
          }}
        >
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
            style={[styles.input, { height: 200 }]}
          />

          <ButtonComp btnText={"Publish"} onPress={dataAddOn} />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default AddBlog;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: "space-between",
  },
  headerText: {
    textTransform: "uppercase",
    fontSize: 18,
    fontWeight: "bold",
    color: colors.themeColor,
    marginBottom: 14,
  },
  headerStyle: {
    paddingVertical: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    width: "100%",
    fontSize: 16,
    marginBottom: 28,
  },
});
