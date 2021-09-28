import React from "react";
import { Text, View, Stylesheet, StyleSheet } from "react-native";

const TermsAndConditionsScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>Terms & Conditions Screen</Text>
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

export default TermsAndConditionsScreen;
