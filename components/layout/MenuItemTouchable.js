import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import React from "react";

const MenuItemTouchable = ({
  onPress,
  style,
  children,
  activeOpacity,
  ...props
}) => {
  return (
    <View style={{ width: "100%" }}>
      <TouchableOpacity
        style={{ ...styles.default, ...style }}
        onPress={onPress}
        activeOpacity={activeOpacity ?? 0.9}
        {...props}
      >
        {children}
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  default: {
    width: "100%",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderColor: "#a6a6a6",
    borderBottomWidth: 1,
    marginVertical: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
export default MenuItemTouchable;
