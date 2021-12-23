import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import AppLoading from "expo-app-loading";
import UserNavigator from "./navigation/UserNavigator";
import AuthProvider from "./auth/auth-context";
import { firebaseConfig } from "./config/firebase";
import firebase from "firebase";
import ThemeProvider from "./theme/theme-context";
import {
  useFonts,
  Heebo_100Thin,
  Heebo_200ExtraLight,
  Heebo_300Light,
  Heebo_400Regular,
  Heebo_500Medium,
  Heebo_600SemiBold,
  Heebo_700Bold,
  Heebo_800ExtraBold,
  Heebo_900Black,
} from "@expo-google-fonts/heebo";

export default function App() {
  const [fontLoaded] = useFonts({
    Heebo_100Thin,
    Heebo_200ExtraLight,
    Heebo_300Light,
    Heebo_400Regular,
    Heebo_500Medium,
    Heebo_600SemiBold,
    Heebo_700Bold,
    Heebo_800ExtraBold,
    Heebo_900Black,
  });

  if (!fontLoaded) {
    return <AppLoading />;
  }
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
