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
  autoCapitalize = "none",
  value,
  placeholder,
  onSubmitEditing,
  autoFocus,
  multiline,
  autoCorrect = false,
  keyboardType,
  editable,
  onBlur,
  error,
  defaultValue,
  label,
  labelStyle,
  onFocus,
  onPressOut,
  onEndEditing,
  ...props
}) => {
  const { colors } = useColor();
  return (
    <>
      {label && (
        <AppText style={[{ color: colors.accentGray, fontSize: 15 }]}>
          {label}
        </AppText>
      )}
      {error && (
        <AppText style={{ color: colors.red }}>{error.message}</AppText>
      )}
      <TextInput
        onEndEditing={onEndEditing}
        onPressOut={onPressOut}
        defaultValue={defaultValue}
        onBlur={onBlur}
        onFocus={onFocus}
        onSubmitEditing={onSubmitEditing}
        placeholder={placeholder}
        placeholderTextColor={colors.placeholderText}
        onChangeText={onChangeText}
        autoCapitalize={autoCapitalize}
        value={value}
        autoFocus={autoFocus}
        multiline={multiline}
        autoCorrect={autoCorrect}
        keyboardType={keyboardType}
        editable={editable}
        style={[defaultStyles(colors).textInput, style]}
        {...props}
      ></TextInput>
    </>
  );
};

export const Typography = ({
  children,
  style: { fontSize, fontFamily, ...restStyle },
  ...props
}) => {
  return (
    <View {...restStyle}>
      <Text style={{ fontSize, fontFamily }}>{children}</Text>
    </View>
  );
};

export const AppButton = ({ style, title, onPress, fontSize, ...props }) => {
  const { colors } = useColor();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[defaultStyles(colors).button, style]}
      activeOpacity={0.9}
      {...props}
    >
      <AppText
        style={{
          fontSize: fontSize ?? 18,
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
      style={[defaultStyles().iconButton, style]}
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  );
};

export const AppScreen = ({ children, style, ...props }) => {
  const { colors, dark } = useColor();
  return (
    <View style={[defaultStyles().screen, style]}>
      <StatusBar barStyle={dark ? "light-content" : "dark-content"} />
      {children}
    </View>
  );
};

const defaultStyles = (colors) =>
  StyleSheet.create({
    button: {
      paddingVertical: 8,
      paddingHorizontal: 14,
      borderRadius: 12,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors?.primary,
    },
    iconButton: {
      alignItems: "center",
      justifyContent: "center",
    },
    textInput: {
      borderRadius: 30,
      paddingVertical: 12,
      paddingHorizontal: 16,
      backgroundColor: colors?.lightGray,
      color: colors?.text,
      fontSize: 16,
    },
    screen: {
      flex: 1,
      backgroundColor: colors?.background,
    },
  });
