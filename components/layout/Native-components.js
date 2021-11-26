import React from "react";
import { Text, View, StyleSheet, TextInput, StatusBar } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { useColor } from "../../hooks/useColor";
import AppText from "./AppText";

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

export const AppTextInput = ({
  style,
  onChangeText,
  autoCapitalize,
  value,
  placeholder,
  onSubmitEditing,
  autoFocus,
  ...props
}) => {
  const { colors } = useColor();
  return (
    <TextInput
      {...props}
      onSubmitEditing={onSubmitEditing}
      placeholder={placeholder}
      placeholderTextColor={colors.text}
      onChangeText={onChangeText}
      autoCapitalize={autoCapitalize ?? "none"}
      value={value}
      autoFocus={autoFocus}
      style={{
        ...defaultStyles.textInput,
        backgroundColor: colors.lightGray,
        color: colors.text,
        ...style,
      }}
    ></TextInput>
  );
};

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
  const { colors } = useColor();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        ...defaultStyles.button,
        backgroundColor: colors.primary,
        ...style,
      }}
      {...restProps}
    >
      <AppText
        style={{
          fontSize: restProps.fontSize ?? 18,
          color:
            style?.color || style?.backgroundColor === colors.lightGray
              ? colors.text
              : "white",
        }}
      >
        {title}
      </AppText>
    </TouchableOpacity>
  );
};

export const AppIconButton = ({
  style,
  onPress,
  children,
  activeOpacity,
  ...props
}) => {
  return (
    <TouchableOpacity
      activeOpacity={activeOpacity ?? 0.7}
      style={{ ...defaultStyles.iconButton, ...style }}
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  );
};

export const AppScreen = ({ children, style, ...props }) => {
  const { colors, dark } = useColor();
  return (
    <View
      style={{
        ...defaultStyles.screen,
        backgroundColor: colors.background,
        ...style,
      }}
    >
      <StatusBar barStyle={dark ? "light-content" : "dark-content"} />
      {children}
    </View>
  );
};

const defaultStyles = StyleSheet.create({
  button: {
    minWidth: 100,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  iconButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    alignItems: "center",
    justifyContent: "flex-start",
    borderRadius: 30,
    width: "100%",
    paddingVertical: 14,
    paddingHorizontal: 12,
  },
  screen: {
    flex: 1,
  },
});
