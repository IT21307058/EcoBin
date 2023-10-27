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

import color from "./src/styles/color";

import AdvertiseHome from "./src/Screen/Advertise/AdvertiseHome";
import AddAdvertise from "./src/Screen/Advertise/AddAdvertise";
import UpdateAdvertise from "./src/Screen/Advertise/UpdateAdvertise";
// import OneAdvertise from './src/Screen/Advertise/OneAdvertise';

import AllCommunity from "./src/Screen/Community/AllCommunity";
import AddPost from "./src/Screen/Community/AddPost";
import UpdatePost from "./src/Screen/Community/UpdatePost";
import OnePost from "./src/Screen/Community/OnePost";
import FeedbackPage from "./src/Screen/Community/FeedbackPage";

//Blogs
import BlogHome from "./src/Screen/Blog/BlogHome"; // Import the BlogHome screen
import AddBlog from "./src/Screen/Blog/AddBlog"; // Import the AddBlog screen
import OneBlog from "./src/Screen/Blog/OneBlog"; // Import the OneBlog screen
import UpdateBlog from "./src/Screen/Blog/UpdateBlog"; // Import the UpdateBlog screen
import DetailedBlogView from "./src/Screen/Blog/DetailedBlogView"; // Import the DetailedBlogView screen

//Farms
import FarmHome from "./src/Screen/FoodSwap/FarmHome"; // Import the FarmHome screen
import AddFarm from "./src/Screen/FoodSwap/AddFarm"; // Import the AddFarm screen
import OneFarm from "./src/Screen/FoodSwap/OneFarm"; // Import the OneFarm screen
import UpdateFarm from "./src/Screen/FoodSwap/UpdateFarm"; // Import the UpdateFarm screen

import AllGoal from "./src/Screen/Goal/AllGoal";
import AddGoal from "./src/Screen/Goal/AddGoal";
import AllReminder from "./src/Screen/Reminder/AllReminder";
import UpdateGoal from "./src/Screen/Goal/UpdateGoal";
import OneGoal from "./src/Screen/Goal/OneGoal";
import AddReminder from "./src/Screen/Reminder/AddReminder";
import UpdateReminder from "./src/Screen/Reminder/UpdateReminder";
import OneReminder from "./src/Screen/Reminder/OneReminder";

import UserAccount from "./src/Screen/UserAccount/UserAccount";
import Home from "./src/Screen/Home/Home";

import imagePath from "./src/constants/imagePath";
import OneAdvertise from "./src/Screen/Advertise/OneAdvertise";
import OnlyProduct from "./src/Screen/Advertise/OnlyProduct";
import OnlyProgram from "./src/Screen/Advertise/OnlyProgram";
import CommunityHome from "./src/Screen/Community/CommunityHome";
import EducationalUserPage from "./src/Screen/Community/EducationalUserPage";
import EnvironmentOrganizationPage from "./src/Screen/Community/EnvironmentOrganizationPage";


//Events
import AddEvent from "./src/Screen/Events/AddEvent";
import AllEvents from "./src/Screen/Events/AllEvents";
import UpdateEvent from "./src/Screen/Events/UpdateEvent";

//Premium
import PremiumV from "./src/Screen/Premium/PremiumV";
import Subscription from "./src/Screen/Premium/Subscription";

import Login from "./src/Screen/Auth/Login";
import Registeration from "./src/Screen/Auth/Registeration";
import SplashScreen from "./src/Screen/Auth/SplashScreen";

function TopTabsGroup() {
  return (
    <TopTabs.Navigator
      screenOptions={{
        tabBarInactiveTintColor: color.blackOpacity50,
        tabBaractiveTintColor: color.themeColor,
        style: {
          backgroundColor: color.themeColor, // Set the background color of the tab bar
        },
        indicatorStyle: {
          backgroundColor: color.themeColor, // Set the indicator (highlight) color
        },
      }}
    >
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
        <Stack.Screen name="splash" component={SplashScreen} />
      </Stack.Navigator>
    );
  }

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarInactiveTintColor: color.blackOpacity50,
        tabBaractiveTintColor: color.themeColor,
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
                    ? color.themeColor
                    : color.blackOpacity50,
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
                    ? color.themeColor
                    : color.blackOpacity50,
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
                    ? color.themeColor
                    : color.blackOpacity50,
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
                    ? color.themeColor
                    : color.blackOpacity50,
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
    </Stack.Navigator>
  );
}

function StackHomeNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainHome" component={Home} />

      <Stack.Screen name="AllGoal" component={AllGoal} />
      <Stack.Screen name="AddGoal" component={AddGoal} />
      <Stack.Screen name="AllReminder" component={AllReminder} />
      <Stack.Screen name="UpdateGoal" component={UpdateGoal} />
      <Stack.Screen name="OneGoal" component={OneGoal} />
      <Stack.Screen name="AddReminder" component={AddReminder} />
      <Stack.Screen name="UpdateReminder" component={UpdateReminder} />
      <Stack.Screen name="OneReminder" component={OneReminder} />
      {/* Blog */}
      <Stack.Screen name="BlogHome" component={BlogHome} />
      <Stack.Screen name="AddBlog" component={AddBlog} />
      <Stack.Screen name="OneBlog" component={OneBlog} />
      <Stack.Screen name="UpdateBlog" component={UpdateBlog} />
      <Stack.Screen name="DetailedBlogView" component={DetailedBlogView} />
      {/* Farm */}
      <Stack.Screen name="FarmHome" component={FarmHome} />
      <Stack.Screen name="AddFarm" component={AddFarm} />
      <Stack.Screen name="OneFarm" component={OneFarm} />
      <Stack.Screen name="UpdateFarm" component={UpdateFarm} />
      {/* Event */}
      <Stack.Screen name="AddEvent" component={AddEvent} />
      <Stack.Screen name="AllEvents" component={AllEvents} />
      <Stack.Screen name="UpdateEvent" component={UpdateEvent} />
      {/* Event */}
      <Stack.Screen name="PremiumV" component={PremiumV} />
      <Stack.Screen name="Subscription" component={Subscription} />

    </Stack.Navigator>
  );
}

function StackAdvertiseNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
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
