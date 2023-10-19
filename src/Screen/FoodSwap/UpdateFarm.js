import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import ButtonComp from '../../Components/ButtonComp';
import colors from '../../styles/color';
import { useNavigation } from '@react-navigation/native';
import { db } from '../../../config';
import { ref, set } from 'firebase/database';
import imagePath from '../../constants/imagePath';

const UpdateFarm = ({ route }) => {
  const navigation = useNavigation();

  const { item } = route.params; // Get the item data passed from the previous screen

  const [name, setName] = useState(item.name);
  const [location, setLocation] = useState(item.location);
  const [type, setType] = useState(item.type);
  const [area, setArea] = useState(item.area);
  const [owner, setOwner] = useState(item.owner);
  const [contactNumber, setContactNumber] = useState(item.contactNumber);
  const [status, setStatus] = useState(item.status);

  const updateData = () => {
    const farmRef = ref(db, `farms/${item.id}`);
    set(farmRef, {
      name: name,
      location: location,
      type: type,
      area: area,
      owner: owner,
      contactNumber: contactNumber,
      status: status,
    })
      .then(() => {
        console.log('Data updated successfully');
      })
      .catch((error) => {
        console.error('Error updating data:', error);
      });
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <View style={styles.headerStyle}>
          <TouchableOpacity onPress={() => navigation.navigate('FarmHome')}>
            <Image source={imagePath.bluearrow} />
          </TouchableOpacity>
          <Image source={imagePath.bluebell} />
        </View>
        <View style={styles.content}>
          <Text style={styles.headerText}>Update Farm</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Name"
              placeholderTextColor="lightgray"
              value={name}
              onChangeText={(text) => setName(text)}
              style={styles.input}
            />

            <TextInput
              placeholder="Location"
              placeholderTextColor="lightgray"
              value={location}
              onChangeText={(text) => setLocation(text)}
              style={styles.input}
            />

            <TextInput
              placeholder="Type"
              placeholderTextColor="lightgray"
              value={type}
              onChangeText={(text) => setType(text)}
              style={styles.input}
            />

            <TextInput
              placeholder="Area"
              placeholderTextColor="lightgray"
              value={area}
              onChangeText={(text) => setArea(text)}
              style={styles.input}
            />

            <TextInput
              placeholder="Owner"
              placeholderTextColor="lightgray"
              value={owner}
              onChangeText={(text) => setOwner(text)}
              style={styles.input}
            />

            <TextInput
              placeholder="Contact Number"
              placeholderTextColor="lightgray"
              value={contactNumber}
              onChangeText={(text) => setContactNumber(text)}
              style={styles.input}
            />

            <TextInput
              placeholder="Status"
              placeholderTextColor="lightgray"
              value={status}
              onChangeText={(text) => setStatus(text)}
              style={styles.input}
            />

            <ButtonComp btnText={'Save'} onPress={() => updateData()} />
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerText: {
    textTransform: 'uppercase',
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.themeColor,
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
    backgroundColor: colors.borderColor,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    width: '100%',
    padding: 20,
    borderRadius: 20,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 12,
    marginBottom: 24,
    fontSize: 16,
  },
});

export default UpdateFarm;
