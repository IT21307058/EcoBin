// import React, { useState } from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   SafeAreaView,
//   TextInput,
//   Image,
//   TouchableOpacity,
// } from 'react-native';
// import ButtonComp from '../../Components/ButtonComp';
// import colors from '../../styles/color';
// import { useNavigation } from '@react-navigation/native';
// import { db } from '../../../config';
// import { ref, set } from 'firebase/database';
// import imagePath from "../../constants/imagePath";


// const UpdateBlog = ({ route }) => {
//   const navigation = useNavigation();

//   const { item } = route.params; // Get the item data passed from the previous screen

//   const [topic, setTopic] = useState(item.topic);
//   const [body, setBody] = useState(item.body);

//   const updateData = () => {
//     const blogRef = ref(db, `blogs/${item.id}`);
//     set(blogRef, {
//       topic: topic,
//       body: body,
//     })
//       .then(() => {
//         console.log('Data updated successfully');
//       })
//       .catch((error) => {
//         console.error('Error updating data:', error);
//       });
//   };

//   return (
//     <View style={styles.container}>
//       <SafeAreaView>
//         <View style={styles.headerStyle}>
//           <TouchableOpacity onPress={() => navigation.navigate('BlogHome')}>
//             <Image source={imagePath.bluearrow} />
//           </TouchableOpacity>
//           <Image source={imagePath.bluebell} />
//         </View>
//         <View style={{ marginTop: 50, alignSelf: 'center' }}>
//           <Text style={styles.headerText}>Update Blog</Text>
//         </View>
//         <View
//           style={{
//             backgroundColor: colors.borderColor,
//             shadowColor: '#000',
//             shadowOffset: { width: 0, height: 2 },
//             shadowOpacity: 0.2,
//             width: '75%',
//             alignSelf: 'center',
//             padding: 15,
//             borderRadius: 20,
//             paddingHorizontal: 24,
//             paddingTop: 44,
//           }}>
//           <TextInput
//             placeholder="Topic"
//             placeholderTextColor="lightgray"
//             value={topic}
//             onChangeText={(text) => setTopic(text)}
//             style={styles.input}
//           />

//           <TextInput
//             placeholder="Body"
//             placeholderTextColor="lightgray"
//             value={body}
//             onChangeText={(text) => setBody(text)}
//             multiline={true}
//             numberOfLines={10}
//             textAlignVertical="top"
//             style={[styles.input, { height: 200 }]}
//           />

//           <ButtonComp btnText={'Save'} onPress={() => updateData()} />
//         </View>
//       </SafeAreaView>
//     </View>
//   );
// };

// export default UpdateBlog;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.white,
//     justifyContent: 'space-between',
//   },
//   headerText: {
//     textTransform: 'uppercase',
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: colors.themeColor,
//     marginBottom: 14,
//   },
//   headerStyle: {
//     paddingVertical: 16,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 6 },
//     shadowOpacity: 0.2,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//   },
//   input: {
//     backgroundColor: 'white',
//     borderRadius: 10,
//     padding: 10,
//     width: '100%',
//     fontSize: 16,
//     marginBottom: 28,
//   },
// });

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
      })
      .catch((error) => {
        console.error('Error updating data:', error);
      });
  };

  return (
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
  bodyInput: {
    height: 200,
    textAlignVertical: 'top',
  },
});

export default UpdateBlog;
