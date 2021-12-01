import React from "react";
import { Text, View, Stylesheet, StyleSheet } from "react-native";
import AppText from "../components/layout/AppText";

const AboutUsScreen = (props) => {
  return (
    <View style={styles.screen}>
      <AppText>About Us Screen</AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AboutUsScreen;
