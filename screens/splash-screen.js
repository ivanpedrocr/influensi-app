import React, { useEffect } from "react";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import { AppScreen } from "../components/layout/Native-components";
import { useColor } from "../hooks/useColor";

const SplashScreen = (props) => {
  const { colors } = useColor();
  return (
    <AppScreen style={styles.indicator}>
      <ActivityIndicator size="small" color={colors.primary} />
    </AppScreen>
  );
};
const styles = StyleSheet.create({
  indicator: {
    alignContent: "center",
    justifyContent: "center",
  },
});
export default SplashScreen;
