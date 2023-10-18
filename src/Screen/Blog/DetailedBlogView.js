import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import colors from '../../styles/color';
import { useNavigation } from '@react-navigation/native';
import imagePath from '../../constants/imagePath';

const DetailedBlogView = ({ route }) => {
  const { item } = route.params; // Get the item data passed from the previous screen

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.headerStyle}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={imagePath.bluearrow} />
          </TouchableOpacity>
          <Image source={imagePath.bluebell} />
        </View>
        <View style={{ marginTop: 50, alignSelf: 'center' }}>
          <Text style={styles.headerText}>Detailed Blog View</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.label}>Topic:</Text>
          <Text style={styles.value}>{item.topic}</Text>

          <Text style={styles.label}>Body:</Text>
          <Text style={styles.value}>{item.body}</Text>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default DetailedBlogView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'space-between',
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
});
