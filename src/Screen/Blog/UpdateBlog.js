import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from 'react-native';
import ButtonComp from '../../Components/ButtonComp';
import { useNavigation } from '@react-navigation/native';
import { db } from '../../../config';
import { ref, set } from 'firebase/database';
import imagePath from '../../constants/imagePath';

const UpdateBlog = ({ route }) => {
  const navigation = useNavigation();

  const { item } = route.params; // Get the item data passed from the previous screen

  const [topic, setTopic] = useState(item.topic);
  const [body, setBody] = useState(item.body);

  const updateData = () => {
    const blogRef = ref(db, `blogs/${item.id}`);
    set(blogRef, {
      topic: topic,
      body: body,
    })
      .then(() => {
        console.log('Data updated successfully');
        Alert.alert('Blog updated successfully', null, [
          {
            text: 'OK',
            onPress: () => navigation.navigate('BlogHome'),
            style: 'cancel',
          },
        ]);
      })
      .catch((error) => {
        console.error('Error updating data:', error);
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
            <TouchableOpacity onPress={() => navigation.navigate('BlogHome')}>
              <Image source={imagePath.bluearrow} />
            </TouchableOpacity>
            <Image source={imagePath.bluebell} />
          </View>
          <View style={styles.content}>
            <Text style={styles.headerText}>Update Blog</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Topic"
                placeholderTextColor="lightgray"
                value={topic}
                onChangeText={(text) => setTopic(text)}
                style={[styles.input, { fontSize: 20 }]} // Increased font size
              />

              <TextInput
                placeholder="Body"
                placeholderTextColor="lightgray"
                value={body}
                onChangeText={(text) => setBody(text)}
                multiline={true}
                numberOfLines={10}
                textAlignVertical="top"
                style={[styles.input, styles.bodyInput, { fontSize: 20 }]} // Increased font size
              />

              <ButtonComp
                btnText={'Save'}
                btnStyle={{ backgroundColor: '#32CD32' }} // Green
                btnTextStyle={{ color: '#FFFFFF', fontSize: 20 }} // White, Increased font size
                onPress={() => updateData()}
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
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerText: {
    textTransform: 'uppercase',
    fontSize: 30, // Increased font size
    fontWeight: 'bold',
    color: '#0E86D4', // Light blue
    marginVertical: 24,
  },
  headerStyle: {
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  inputContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    width: '100%',
    padding: 20,
    borderRadius: 20,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white
    borderRadius: 10,
    padding: 12,
    marginBottom: 24,
  },
  bodyInput: {
    height: 200,
    textAlignVertical: 'top',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
});

export default UpdateBlog;
