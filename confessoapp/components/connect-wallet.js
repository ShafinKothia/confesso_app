
import { useNavigation } from '@react-navigation/native'
import React, { useEffect } from "react";
import { Button, StyleSheet, Text, useColorScheme, View, Image } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { CONTRACT_ADDRESS } from "../consts/addresses";
const img = require('../assets/icon.png');

const ConnectToWallet = () => {

  



  return (
    <View style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#121212' }}>
                <Image source={require("../assets/icon.png")} style={{ height: 150, width: 150, alignSelf: 'center' }} />
    </View>
  );
}

export default ConnectToWallet