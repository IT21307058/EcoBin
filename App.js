import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const TopTabs = createMaterialTopTabNavigator();

import colors from "../ecobin/src/styles/color"

import AdvertiseHome from './src/Screen/Advertise/AdvertiseHome';
import AddAdvertise from './src/Screen/Advertise/AddAdvertise';
import UpdateAdvertise from './src/Screen/Advertise/UpdateAdvertise';
// import OneAdvertise from './src/Screen/Advertise/OneAdvertise';

import AllCommunity from './src/Screen/Community/AllCommunity';
import AddPost from './src/Screen/Community/AddPost';
import UpdatePost from './src/Screen/Community/UpdatePost';
import OnePost from './src/Screen/Community/OnePost';
import FeedbackPage from './src/Screen/Community/FeedbackPage';

import UserAccount from './src/Screen/UserAccount/UserAccount';
import Home from './src/Screen/Home/Home';

import imagePath from './src/constants/imagePath';
import OneAdvertise from './src/Screen/Advertise/OneAdvertise';
import OnlyProduct from './src/Screen/Advertise/OnlyProduct';
import OnlyProgram from './src/Screen/Advertise/OnlyProgram';

function TopTabsGroup() {
  return (
    <TopTabs.Navigator>
      <TopTabs.Screen name="main" component={AdvertiseHome} />
      <TopTabs.Screen name="Product" component={OnlyProduct} />
      <TopTabs.Screen name="Program" component={OnlyProgram} />
    </TopTabs.Navigator>
  )
}

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarInactiveTintColor: colors.blackOpacity50,
        tabBaractiveTintColor: colors.themeColor
      }}
    >
      <Tab.Screen name='Home' component={Home}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Image style={{
                tintColor: focused ? colors.themeColor : colors.blackOpacity50
              }} source={imagePath.blueHome} />
            )
          }
        }}
      />
      <Tab.Screen name='Community' component={StackNavigator}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Image style={{
                tintColor: focused ? colors.themeColor : colors.blackOpacity50
              }} source={imagePath.community} />
            )
          }
        }}
      />
      <Tab.Screen name='Advertise' component={TopTabsGroup}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Image style={{
                tintColor: focused ? colors.themeColor : colors.blackOpacity50
              }} source={imagePath.blog} />
            )
          }
        }}
      />
      <Tab.Screen name='Profile' component={UserAccount}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Image style={{
                tintColor: focused ? colors.themeColor : colors.blackOpacity50
              }} source={imagePath.user} />
            )
          }
        }}
      />
    </Tab.Navigator>
  )
}

function StackNavigator() {

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='AllCommunity' component={AllCommunity} />
      <Stack.Screen name='AddPost' component={AddPost} />
      <Stack.Screen name='UpdatePost' component={UpdatePost} />
      <Stack.Screen name='OnePost' component={OnePost} />
      <Stack.Screen name='FeedbackPage' component={FeedbackPage} />
      {/* <Stack.Screen name='AdvertiseHome' component={AdvertiseHome} /> */}
      <Stack.Screen name='AddAdvertise' component={AddAdvertise} />
      <Stack.Screen name='UpdateAdvertise' component={UpdateAdvertise} />
      <Stack.Screen name='OneAdvertise' component={OneAdvertise} />
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      {/* <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='AdvertiseHome' component={AdvertiseHome} />
        <Stack.Screen name='AddAdvertise' component={AddAdvertise} />
        <Stack.Screen name='UpdateAdvertise' component={UpdateAdvertise} />
        <Stack.Screen name='AllCommunity' component={AllCommunity} />
        <Stack.Screen name='AddPost' component={AddPost} />
        <Stack.Screen name='UpdatePost' component={UpdatePost} />
        <Stack.Screen name='OnePost' component={OnePost} />
        <Stack.Screen name='FeedbackPage' component={FeedbackPage} />
      </Stack.Navigator> */}
      <TabNavigator />
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
