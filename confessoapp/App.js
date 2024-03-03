
import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, useColorScheme, View } from "react-native";


import AddConfession from "./components/add-confession";
import Main from "./components/main";
import { Auth } from "./components/auth";
import { NativeBaseProvider } from "native-base";




const App = () => {

  return (
    <Auth.AuthProvider>
      <NativeBaseProvider>
        <Main />
      </NativeBaseProvider>
    </Auth.AuthProvider>
  );
};



export default App;
