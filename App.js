import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import UserNavigator from "./navigation/UserNavigator";
import AuthProvider from "./auth/auth-context";
import { firebaseConfig } from "./config/firebase";
import firebase from "firebase";
import ThemeProvider from "./theme/theme-context";

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  // const [fontLoaded, setFontLoaded] = useState(false);
  // if (!fontLoaded) {
  //   return (
  //     <AppLoading
  //       startAsync={fetchFonts}
  //       onFinish={() => setFontLoaded(true)}
  //       onError={(err) => console.log(err)}
  //     />
  //   );
  // }
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }
  return (
    <AuthProvider>
      <ThemeProvider>
        <UserNavigator />
      </ThemeProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
