import React from "react";
import { View } from "react-native";
import { useColor } from "../hooks/useColor";
import { AppButton } from "./layout/Native-components";

const ToggleTheme = () => {
  const { toggleColorMode, colors } = useColor();
  return (
    <View>
      <AppButton
        title="Toggle Theme"
        onPress={toggleColorMode}
        style={{ backgroundColor: colors.lightGray }}
      />
    </View>
  );
};

export default ToggleTheme;
