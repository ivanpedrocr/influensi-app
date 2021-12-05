import React from "react";
import { StyleSheet, TouchableHighlight, View } from "react-native";
import { useColor } from "../../hooks/useColor";
import AppText from "./AppText";

const RadioButton = ({ style, onSelect, label, values, options }) => {
  const { colors } = useColor();
  const RadioButtonItem = ({ value, label }) => (
    <View style={styles().itemContainer}>
      <AppText style={styles().itemLabel}>{label}</AppText>
      <TouchableHighlight
        onPress={() => {
          onSelect(value);
        }}
        style={[styles(colors).item, style]}
      >
        {values === value ? (
          <View style={styles(colors).itemInnerButton} />
        ) : (
          <></>
        )}
      </TouchableHighlight>
    </View>
  );
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
      {options.map(({ label, value }) => (
        <RadioButtonItem label={label} value={value} key={value} />
      ))}
    </View>
  );
};

const styles = (colors) =>
  StyleSheet.create({
    itemContainer: {
      justifyContent: "center",
      alignItems: "center",
    },
    itemLabel: {
      fontWeight: "400",
      paddingBottom: 4,
    },
    itemInnerButton: {
      height: "65%",
      width: "65%",
      borderRadius: 20,
      backgroundColor: colors?.primary,
    },
    item: {
      height: 40,
      width: 40,
      borderRadius: 20,
      borderWidth: 2,
      borderColor: colors?.primary,
      alignItems: "center",
      justifyContent: "center",
    },
  });

export default RadioButton;
