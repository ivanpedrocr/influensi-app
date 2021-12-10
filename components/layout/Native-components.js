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
  ...props
}) => {
  const { colors } = useColor();
  return (
    <View style={{ flexGrow: 1 }}>
      {error && (
        <AppText style={{ color: colors.red }}>{error.message}</AppText>
      )}
      <TextInput
        defaultValue={defaultValue}
        onBlur={onBlur}
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
    </View>
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

export const AppButton = ({ style, title, onPress, ...props }) => {
  const defaultProps = {
    activeOpacity: 0.9,
  };
  const restProps = { ...defaultProps, ...props };
  const { colors } = useColor();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[defaultStyles(colors).button, style]}
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
      minWidth: 100,
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors?.primary,
    },
    iconButton: {
      alignItems: "center",
      justifyContent: "center",
    },
    textInput: {
      flexDirection: "row",
      justifyContent: "center",
      borderRadius: 30,
      width: "100%",
      paddingVertical: 14,
      paddingHorizontal: 12,
      backgroundColor: colors?.lightGray,
      color: colors?.text,
      fontSize: 14,
    },
    screen: {
      flex: 1,
      backgroundColor: colors?.background,
    },
  });
