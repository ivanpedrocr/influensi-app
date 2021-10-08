import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { AppButton } from "../components/layout/Native-components";

const LanguagesScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>Languages Screen</Text>
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

export default LanguagesScreen;
