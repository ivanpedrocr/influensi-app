import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";
import AppText from "./AppText";

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

export const TypingInput = styled.TextInput`
  height: 40px;
  border-width: 1px;
  width: 100px;
  padding: 4px;
`;

export const Typography = ({
  children,
  style: { fontSize, fontFamily, ...restStyle },
  ...props
}) => {
  return (
    <View {...restStyle}>
      <Text style={{ fontSize: fontSize, fontFamily: fontFamily }}>
        {children}
      </Text>
    </View>
  );
};

export const AppButton = ({ style, title, onPress, ...props }) => {
  const defaultProps = {
    activeOpacity: 0.9,
  };
  const restProps = { ...defaultProps, ...props };
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ ...defaultStyles.button, ...style }}
      {...restProps}
    >
      <AppText style={{ fontSize: restProps.fontSize ?? 18, color: "white" }}>
        {title}
      </AppText>
    </TouchableOpacity>
  );
};

const defaultStyles = StyleSheet.create({
  button: {
    width: 100,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: "#2a5bfa",
    justifyContent: "center",
    alignItems: "center",
  },
});
