import React from "react";
import { Text } from "react-native";
import { useColor } from "../../hooks/useColor";

const AppText = ({ style, children, numberOfLines, ...props }) => {
  const { colors } = useColor();
  const defaultStyle = { fontSize: 16, color: colors.text };
  return (
    <Text
      {...props}
      style={[defaultStyle, style]}
      numberOfLines={numberOfLines}
    >
      {children}
    </Text>
  );
};

export default AppText;
