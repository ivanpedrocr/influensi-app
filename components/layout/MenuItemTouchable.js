import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import React from "react";
import { useColor } from "../../hooks/useColor";

const MenuItemTouchable = ({
  onPress,
  style,
  children,
  activeOpacity,
  ...props
}) => {
  const { colors } = useColor();
  return (
    <View style={{ width: "100%" }}>
      <TouchableOpacity
        style={{ ...styles(colors).default, ...style }}
        onPress={onPress}
        activeOpacity={activeOpacity ?? 0.9}
        {...props}
      >
        {children}
      </TouchableOpacity>
    </View>
  );
};
const styles = (colors) =>
  StyleSheet.create({
    default: {
      width: "100%",
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderBottomWidth: 2,
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      borderColor: colors.lightGray,
    },
  });
export default MenuItemTouchable;
