// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View, Image } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import React, { useState, useEffect } from 'react';
// import { firebase } from './config'

// const Stack = createNativeStackNavigator();
// const Tab = createMaterialBottomTabNavigator();
// const TopTabs = createMaterialTopTabNavigator();

// import colors from "../EcoBin/src/styles/color"

// import AdvertiseHome from './src/Screen/Advertise/AdvertiseHome';
// import AddAdvertise from './src/Screen/Advertise/AddAdvertise';
// import UpdateAdvertise from './src/Screen/Advertise/UpdateAdvertise';

// import AllCommunity from './src/Screen/Community/AllCommunity';
// import AddPost from './src/Screen/Community/AddPost';
// import UpdatePost from './src/Screen/Community/UpdatePost';
// import OnePost from './src/Screen/Community/OnePost';
// import FeedbackPage from './src/Screen/Community/FeedbackPage';
// import AllGoal from "./src/Screen/Goal/AllGoal";
// import AddGoal from "./src/Screen/Goal/AddGoal";
// import AllReminder from './src/Screen/Reminder/AllReminder';

// import UserAccount from './src/Screen/UserAccount/UserAccount';
// import Home from './src/Screen/Home/Home';

// import imagePath from './src/constants/imagePath';
// import OneAdvertise from './src/Screen/Advertise/OneAdvertise';
// import OnlyProduct from './src/Screen/Advertise/OnlyProduct';
// import OnlyProgram from './src/Screen/Advertise/OnlyProgram';
// import CommunityHome from './src/Screen/Community/CommunityHome';
// import EducationalUserPage from './src/Screen/Community/EducationalUserPage';
// import EnvironmentOrganizationPage from './src/Screen/Community/EnvironmentOrganizationPage';

// import Login from './src/Screen/Auth/Login';
// import Registeration from './src/Screen/Auth/Registeration';

// function TopTabsGroup() {
//   return (
//     <TopTabs.Navigator>
//       <TopTabs.Screen name="main" component={AdvertiseHome} />
//       <TopTabs.Screen name="Product" component={OnlyProduct} />
//       <TopTabs.Screen name="Program" component={OnlyProgram} />
//     </TopTabs.Navigator>
//   )
// }

// function TabNavigator() {

//   const [intializing, setInitilizing] = useState(true);
//   const [user, setUser] = useState();

//   function onAuthStateChanges(user) {
//     setUser(user);
//     if (intializing) setInitilizing(false);
//   }

//   useEffect(() => {
//     const subcriber = firebase.auth().onAuthStateChanged(onAuthStateChanges);
//     return subcriber;
//   }, []);

//   if (intializing) return null;

//   if (!user) {
//     return (
//       <Stack.Navigator screenOptions={{ headerShown: false }}>
//         <Stack.Screen name='Login' component={Login}  />
//         <Stack.Screen name='Registeration' component={Registeration}/>
//       </Stack.Navigator>
//     )
//   }

//   return (
//     <Tab.Navigator
//       screenOptions={{
//         headerShown: false,
//         tabBarInactiveTintColor: colors.blackOpacity50,
//         tabBaractiveTintColor: colors.themeColor
//       }}
//     >
//       <Tab.Screen name='Home' component={Home}
//         options={{
//           tabBarIcon: ({ focused }) => {
//             return (
//               <Image style={{
//                 tintColor: focused ? colors.themeColor : colors.blackOpacity50
//               }} source={imagePath.blueHome} />
//             )
//           }
//         }}
//       />
//       <Tab.Screen name='Community' component={StackNavigator}
//         options={{
//           tabBarIcon: ({ focused }) => {
//             return (
//               <Image style={{
//                 tintColor: focused ? colors.themeColor : colors.blackOpacity50
//               }} source={imagePath.community} />
//             )
//           }
//         }}
//       />
//       <Tab.Screen name='Advertise' component={TopTabsGroup}
//         options={{
//           tabBarIcon: ({ focused }) => {
//             return (
//               <Image style={{
//                 tintColor: focused ? colors.themeColor : colors.blackOpacity50
//               }} source={imagePath.blog} />
//             )
//           }
//         }}
//       />
//       <Tab.Screen name='Profile' component={UserAccount}
//         options={{
//           tabBarIcon: ({ focused }) => {
//             return (
//               <Image style={{
//                 tintColor: focused ? colors.themeColor : colors.blackOpacity50
//               }} source={imagePath.user} />
//             )
//           }
//         }}
//       />
//     </Tab.Navigator>
//   )
// }

// function StackNavigator() {

//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name='CommunityHome' component={CommunityHome} />
//       <Stack.Screen name='EducationalUserPage' component={EducationalUserPage} />
//       <Stack.Screen name='EnvironmentOrganizationPage' component={EnvironmentOrganizationPage} />
//       <Stack.Screen name='AllCommunity' component={AllCommunity} />
//       <Stack.Screen name='AddPost' component={AddPost} />
//       <Stack.Screen name='UpdatePost' component={UpdatePost} />
//       <Stack.Screen name='OnePost' component={OnePost} />
//       <Stack.Screen name='FeedbackPage' component={FeedbackPage} />
//       {/* <Stack.Screen name='AdvertiseHome' component={AdvertiseHome} /> */}
//       <Stack.Screen name='AddAdvertise' component={AddAdvertise} />
//       <Stack.Screen name='UpdateAdvertise' component={UpdateAdvertise} />
//       <Stack.Screen name='OneAdvertise' component={OneAdvertise} />
//         <Stack.Screen name="AllGoal" component={AllGoal} />
//         <Stack.Screen name="AddGoal" component={AddGoal} />
//         <Stack.Screen name="AllReminder" component={AllReminder} />
//     </Stack.Navigator>
//   )
// }

// export default function App() {
//   return (
//     <NavigationContainer>
//       {/* <Stack.Navigator screenOptions={{ headerShown: false }}>
//         <Stack.Screen name='AdvertiseHome' component={AdvertiseHome} />
//         <Stack.Screen name='AddAdvertise' component={AddAdvertise} />
//         <Stack.Screen name='UpdateAdvertise' component={UpdateAdvertise} />
//         <Stack.Screen name='AllCommunity' component={AllCommunity} />
//         <Stack.Screen name='AddPost' component={AddPost} />
//         <Stack.Screen name='UpdatePost' component={UpdatePost} />
//         <Stack.Screen name='OnePost' component={OnePost} />
//         <Stack.Screen name='FeedbackPage' component={FeedbackPage} />
//       </Stack.Navigator> */}
//       <TabNavigator />
//     </NavigationContainer>
//   );
// }

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React, { useState, useEffect } from "react";
import { firebase } from "./config";

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const TopTabs = createMaterialTopTabNavigator();

import colors from "../EcoBin/src/styles/color";

import AdvertiseHome from "./src/Screen/Advertise/AdvertiseHome";
import AddAdvertise from "./src/Screen/Advertise/AddAdvertise";
import UpdateAdvertise from "./src/Screen/Advertise/UpdateAdvertise";
// import OneAdvertise from './src/Screen/Advertise/OneAdvertise';

import AllCommunity from "./src/Screen/Community/AllCommunity";
import AddPost from "./src/Screen/Community/AddPost";
import UpdatePost from "./src/Screen/Community/UpdatePost";
import OnePost from "./src/Screen/Community/OnePost";
import FeedbackPage from "./src/Screen/Community/FeedbackPage";

import AllGoal from "./src/Screen/Goal/AllGoal";
import AddGoal from "./src/Screen/Goal/AddGoal";
import AllReminder from "./src/Screen/Reminder/AllReminder";
import UpdateGoal from "./src/Screen/Goal/UpdateGoal";
import OneGoal from "./src/Screen/Goal/OneGoal";

import UserAccount from "./src/Screen/UserAccount/UserAccount";
import Home from "./src/Screen/Home/Home";

import imagePath from "./src/constants/imagePath";
import OneAdvertise from "./src/Screen/Advertise/OneAdvertise";
import OnlyProduct from "./src/Screen/Advertise/OnlyProduct";
import OnlyProgram from "./src/Screen/Advertise/OnlyProgram";
import CommunityHome from "./src/Screen/Community/CommunityHome";
import EducationalUserPage from "./src/Screen/Community/EducationalUserPage";
import EnvironmentOrganizationPage from "./src/Screen/Community/EnvironmentOrganizationPage";

import Login from "./src/Screen/Auth/Login";
import Registeration from "./src/Screen/Auth/Registeration";

function TopTabsGroup() {
  return (
    <TopTabs.Navigator>
      <TopTabs.Screen name="main" component={AdvertiseHome} />
      <TopTabs.Screen name="Product" component={OnlyProduct} />
      <TopTabs.Screen name="Program" component={OnlyProgram} />
    </TopTabs.Navigator>
  );
}

function TabNavigator() {
  const [intializing, setInitilizing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanges(user) {
    setUser(user);
    if (intializing) setInitilizing(false);
  }

  useEffect(() => {
    const subcriber = firebase.auth().onAuthStateChanged(onAuthStateChanges);
    return subcriber;
  }, []);

  if (intializing) return null;

  if (!user) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Registeration" component={Registeration} />
      </Stack.Navigator>
    );
  }

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarInactiveTintColor: colors.blackOpacity50,
        tabBaractiveTintColor: colors.themeColor,
      }}
    >
      <Tab.Screen
        name="Home"
        component={StackHomeNavigator}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                style={{
                  tintColor: focused
                    ? colors.themeColor
                    : colors.blackOpacity50,
                }}
                source={imagePath.blueHome}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Community"
        component={StackNavigator}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                style={{
                  tintColor: focused
                    ? colors.themeColor
                    : colors.blackOpacity50,
                }}
                source={imagePath.community}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Advertise"
        component={StackAdvertiseNavigator}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                style={{
                  tintColor: focused
                    ? colors.themeColor
                    : colors.blackOpacity50,
                }}
                source={imagePath.blog}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={UserAccount}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                style={{
                  tintColor: focused
                    ? colors.themeColor
                    : colors.blackOpacity50,
                }}
                source={imagePath.user}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CommunityHome" component={CommunityHome} />
      <Stack.Screen
        name="EducationalUserPage"
        component={EducationalUserPage}
      />
      <Stack.Screen
        name="EnvironmentOrganizationPage"
        component={EnvironmentOrganizationPage}
      />
      <Stack.Screen name="AllCommunity" component={AllCommunity} />
      <Stack.Screen name="AddPost" component={AddPost} />
      <Stack.Screen name="UpdatePost" component={UpdatePost} />
      <Stack.Screen name="OnePost" component={OnePost} />
      <Stack.Screen name="FeedbackPage" component={FeedbackPage} />
      {/* <Stack.Screen name='AdvertiseHome' component={AdvertiseHome} /> */}
      {/* <Stack.Screen name='AddAdvertise' component={AddAdvertise} />
      <Stack.Screen name='UpdateAdvertise' component={UpdateAdvertise} />
      <Stack.Screen name='OneAdvertise' component={OneAdvertise} /> */}
    </Stack.Navigator>
  );
}

function StackHomeNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainHome" component={Home} />

      {/* Insert Here !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
      <Stack.Screen name="AllGoal" component={AllGoal} />
      <Stack.Screen name="AddGoal" component={AddGoal} />
      <Stack.Screen name="AllReminder" component={AllReminder} />
      <Stack.Screen name="UpdateGoal" component={UpdateGoal} />
      <Stack.Screen name="OneGoal" component={OneGoal} />
    </Stack.Navigator>
  );
}

function StackAdvertiseNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name='CommunityHome' component={CommunityHome} />
      <Stack.Screen name='EducationalUserPage' component={EducationalUserPage} />
      <Stack.Screen name='EnvironmentOrganizationPage' component={EnvironmentOrganizationPage} />
      <Stack.Screen name='AllCommunity' component={AllCommunity} />
      <Stack.Screen name='AddPost' component={AddPost} />
      <Stack.Screen name='UpdatePost' component={UpdatePost} />
      <Stack.Screen name='OnePost' component={OnePost} />
      <Stack.Screen name='FeedbackPage' component={FeedbackPage} /> */}
      <Stack.Screen name="AdvertiseHome" component={TopTabsGroup} />
      <Stack.Screen name="AddAdvertise" component={AddAdvertise} />
      <Stack.Screen name="UpdateAdvertise" component={UpdateAdvertise} />
      <Stack.Screen name="OneAdvertise" component={OneAdvertise} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
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
