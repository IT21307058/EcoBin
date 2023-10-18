import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import ButtonComp from '../../Components/ButtonComp';
import colors from '../../styles/color';
import { useNavigation } from '@react-navigation/native';
import { db } from '../../../config';
import { ref, remove } from 'firebase/database';
import imagePath from '../../constants/imagePath';

const OneBlog = ({ route }) => {
  const navigation = useNavigation();

  const { item } = route.params; // Get the item data passed from the previous screen

  const handleUpdate = (item) => {
    // Navigate to the update page with the item data
    navigation.navigate('UpdateBlog', { item });
  };

  const handleDelete = (itemId) => {
    // Remove the item from Firebase Realtime Database
    const blogRef = ref(db, 'blogs/' + itemId);
    remove(blogRef)
      .then(() => {
        console.log('Blog deleted successfully');
        // You can also update the state to remove the deleted item from the list
      })
      .catch((error) => {
        console.error('Error deleting blog:', error);
      });
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.headerStyle}>
          <TouchableOpacity onPress={() => navigation.navigate('BlogHome')}>
            <Image source={imagePath.bluearrow} />
          </TouchableOpacity>
          <Image source={imagePath.bluebell} />
        </View>
        <View style={{ marginTop: 50, alignSelf: 'center' }}>
          <Text style={styles.headerText}>Create Blog</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.label}>Topic:</Text>
          <Text style={styles.value}>{item.topic}</Text>

          <Text style={styles.label}>Body:</Text>
          <Text style={styles.value}>{item.body}</Text>

          <ButtonComp btnText={'Update'} onPress={() => handleUpdate(item)} />
          <Text />
          <ButtonComp
            btnText={'Delete'}
            btnStyle={{
              backgroundColor: colors.white,
              borderWidth: 1,
              borderColor: colors.themeColor,
            }}
            btnTextStyle={{ color: colors.themeColor }}
            onPress={() => handleDelete(item.id)}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default OneBlog;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'space-between',
  },
  title: {
    textTransform: 'uppercase',
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.themeColor,
    marginBottom: 14,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.blackOpacity30,
  },
  value: {
    fontSize: 20,
    marginBottom: 10,
  },
  headerStyle: {
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  headerText: {
    textTransform: 'uppercase',
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.themeColor,
    marginBottom: 14,
  },
});
