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

const OneFarm = ({ route }) => {
  const navigation = useNavigation();

  const { item } = route.params; // Get the item data passed from the previous screen

  const handleUpdate = (item) => {
    // Navigate to the update page with the item data
    navigation.navigate('UpdateFarm', { item });
  };

  const handleDelete = (itemId) => {
    // Remove the item from Firebase Realtime Database
    const farmRef = ref(db, 'farms/' + itemId);
    remove(farmRef)
      .then(() => {
        console.log('Farm deleted successfully');
        // You can also update the state to remove the deleted item from the list
      })
      .catch((error) => {
        console.error('Error deleting farm:', error);
      });
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.headerStyle}>
          <TouchableOpacity onPress={() => navigation.navigate('FarmHome')}>
            <Image source={imagePath.bluearrow} />
          </TouchableOpacity>
          <Image source={imagePath.bluebell} />
        </View>
        <View style={{ marginTop: 50, alignSelf: 'center' }}>
          <Text style={styles.headerText}>Edit Farm</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{item.name}</Text>

          <Text style={styles.label}>Location:</Text>
          <Text style={styles.value}>{item.location}</Text>

          <Text style={styles.label}>Type:</Text>
          <Text style={styles.value}>{item.type}</Text>

          <Text style={styles.label}>Area:</Text>
          <Text style={styles.value}>{item.area}</Text>

          <Text style={styles.label}>Owner:</Text>
          <Text style={styles.value}>{item.owner}</Text>

          <Text style={styles.label}>Contact Number:</Text>
          <Text style={styles.value}>{item.contactNumber}</Text>

          <Text style={styles.label}>Status:</Text>
          <Text style={styles.value}>{item.status}</Text>

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

export default OneFarm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'space-between',
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
    alignSelf: 'center',
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
    alignSelf: 'center',
  },
});
