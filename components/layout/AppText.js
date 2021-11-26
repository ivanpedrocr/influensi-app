import React from "react";
import { Text } from "react-native";
import { useColor } from "../../hooks/useColor";

const AppText = ({ style, children, ...props }) => {
  const { colors } = useColor();
  const defaultStyle = { fontSize: 16 };
  return (
    <Text {...props} style={{ ...defaultStyle, color: colors.text, ...style }}>
      {children}
    </Text>
  );
};

export default AppText;
