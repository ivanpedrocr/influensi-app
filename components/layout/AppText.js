import React from "react";
import { Text } from "react-native";
import { useColor } from "../../hooks/useColor";

const AppText = ({ style, children, numberOfLines, ...props }) => {
  const { colors } = useColor();
  return (
    <Text
      {...props}
      style={[
        { fontFamily: "Heebo_500Medium", fontSize: 16, color: colors.text },
        style,
      ]}
      numberOfLines={numberOfLines}
    >
      {children}
    </Text>
  );
};

export default AppText;
