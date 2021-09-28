import React from "react";
import { Text } from "react-native";

const AppText = ({ style, children, ...props }) => {
  const defaultStyle = { fontSize: 18 };
  return (
    <Text {...props} style={{ ...defaultStyle, ...style }}>
      {children}
    </Text>
  );
};

export default AppText;
