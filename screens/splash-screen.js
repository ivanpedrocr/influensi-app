import React from "react";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import { appColors } from "../styles/app-styles";

const SplashScreen = (props) => {
  return (
    <View style={styles.screen}>
      <ActivityIndicator size={30} color={appColors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});

export default SplashScreen;
