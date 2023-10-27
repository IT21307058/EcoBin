import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, ImageBackground } from 'react-native';
import colors from '../../styles/color';
import { useNavigation } from '@react-navigation/native';
import imagePath from '../../constants/imagePath';

const DetailedBlogView = ({ route }) => {
  const navigation = useNavigation();
  const { item } = route.params; // Get the item data passed from the previous screen

  return (
    <ImageBackground
      source={imagePath.background}
      style={styles.backgroundImage}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.headerStyle}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={imagePath.bluearrow} style={styles.headerImage} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={imagePath.bluebell} style={styles.headerImage} />
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <Text style={styles.headerText}>Detailed Blog View</Text>
          <View style={styles.card}>
            <Text style={styles.label}>Topic:</Text>
            <Text style={styles.value}>{item.topic}</Text>

            <Text style={styles.label}>Body:</Text>
            <Text style={styles.value}>{item.body}</Text>
          </View>
        </View>
      </SafeAreaView>
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
  headerStyle: {
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  headerImage: {
    width: 40, // increased width
    height: 40, // increased height
    margin: 16,
  },
  headerText: {
    textTransform: 'uppercase',
    fontSize: 30, // increased font size
    fontWeight: 'bold',
    color: '#0E86D4', // light blue
    marginVertical: 24,
  },
  card: {
    backgroundColor: 'transparent', // transparent
    borderRadius: 10,
    padding: 16,
    width: '80%',
    alignSelf: 'center',
  },
  label: {
    fontSize: 20, // increased font size
    fontWeight: 'bold',
    color: '#0E86D4', // light blue
  },
  value: {
    fontSize: 24, // increased font size
    marginBottom: 10,
    color: '#FFFFFF', // white
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
});

export default DetailedBlogView;
