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
import { ref, set, push } from 'firebase/database';
import imagePath from '../../constants/imagePath';
import RNRNPickerSelectSelect from 'react-native-picker-select';

const AddFarm = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [area, setArea] = useState('');
  const [owner, setOwner] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [status, setStatus] = useState('');

  const dataAddOn = () => {
    const farmRef = ref(db, 'farms');
    const newFarmRef = push(farmRef);
    set(newFarmRef, {
      name: name,
      location: location,
      type: type,
      area: area,
      owner: owner,
      contactNumber: contactNumber,
      status: status,
    })
      .then(() => {
        console.log('Farm added successfully');
        setName('');
        setLocation('');
        setType('');
        setArea('');
        setOwner('');
        setContactNumber('');
        setStatus('');
      })
      .catch((error) => {
        console.error('Error adding farm:', error);
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
          <Text style={styles.headerText}>Add Farm</Text>
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
            <View style={styles.pickerContainer}>
              <Text>Type:</Text>
              <RNPickerSelect
                selectedValue={type}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) => setType(itemValue)}>
                <RNPickerSelect.Item label="Type 1" value="Type 1" />
                <RNPickerSelect.Item label="Type 2" value="Type 2" />
                <RNPickerSelect.Item label="Type 3" value="Type 3" />
              </RNPickerSelect>
            </View>
            <View style={styles.pickerContainer}>
              <Text>Area:</Text>
              <RNPickerSelect
                selectedValue={area}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) => setArea(itemValue)}>
                <RNPickerSelect.Item label="Area 1" value="Area 1" />
                <RNPickerSelect.Item label="Area 2" value="Area 2" />
                <RNPickerSelect.Item label="Area 3" value="Area 3" />
              </RNPickerSelect>
            </View>
            <View style={styles.pickerContainer}>
              <Text>Status:</Text>
              <RNPickerSelect
                selectedValue={status}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) => setStatus(itemValue)}>
                <RNPickerSelect.Item label="Available" value="Available" />
                <RNPickerSelect.Item label="Not Available" value="Not Available" />
              </RNPickerSelect>
            </View>
            <ButtonComp btnText={'Add Farm'} onPress={dataAddOn} />
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
  pickerContainer: {
    marginBottom: 24,
  },
  picker: {
    height: 50,
    width: 200,
  },
});

export default AddFarm;
