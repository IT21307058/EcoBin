
import React, { useEffect, useState } from "react";
import {SafeAreaView,View,StyleSheet,Image,TextInput,Alert,Text,TouchableOpacity,FlatList,} from "react-native";
import { ImageBackground } from "react-native";
import { db } from "../../../config";
import { useNavigation } from "@react-navigation/native";
import { onValue } from "firebase/database";
import imagePath from "../../constants/imagePath";
import colors from "../../styles/color";
import {moderateScale,moderateVerticalScale,scale,} from "react-native-size-matters";
import { ref, set, push } from "firebase/database";
import { Card } from "react-native-paper";
import Btn from "../../Components/Btn";
import Icon from "react-native-vector-icons/FontAwesome";
import { remove } from "firebase/database";

const PremiumVersion = () => {
    <View style={styles.container}>
    <ImageBackground source={imagePath.background} style={styles.imgStyle}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.headerStyle}>
            <Image source={imagePath.backarrow} />
            <Image source={imagePath.bell} />
          </View>
          <Text style={styles.AdvertiseTextStyle}> Events</Text>
        </SafeAreaView>
      </ImageBackground>
</View>
}

export default PremiumVersion;