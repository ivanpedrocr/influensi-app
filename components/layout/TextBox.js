import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { useColor } from "../../hooks/useColor";

const TextBox = ({
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
      multiline={true}
      autoCorrect={autoCorrect}
      keyboardType={keyboardType}
      editable={editable}
      style={[defaultStyles(colors).textInput, style]}
      {...props}
    ></TextInput>
  );
};

const defaultStyles = (colors) =>
  StyleSheet.create({
    textInput: {
      flexDirection: "row",
      justifyContent: "center",
      borderRadius: 30,
      width: "100%",
      height: 200,
      paddingTop: 20,
      paddingLeft: 20,
      paddingRight: 20,
      paddingBottom: 20,
      backgroundColor: colors?.lightGray,
      color: colors?.text,
      fontSize: 14,
      shadowColor: "black",
      shadowOpacity: 0.2,
      shadowOffset: { height: 2, width: -1 },
      shadowRadius: 10,
    },
  });

export default TextBox;
