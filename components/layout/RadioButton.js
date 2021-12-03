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
        style={[
          {
            height: 40,
            width: 40,
            borderRadius: 20,
            borderWidth: 2,
            borderColor: colors.primary,
            alignItems: "center",
            justifyContent: "center",
          },
          style,
        ]}
      >
        {values === value ? (
          <View
            style={{
              height: "65%",
              width: "65%",
              borderRadius: 20,
              backgroundColor: colors.primary,
            }}
          />
        ) : (
          <></>
        )}
      </TouchableHighlight>
    </View>
  );
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
      {options.map(({ label, value }) => (
        <RadioButtonItem label={label} value={value} />
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
      fontWeight: "bold",
      paddingBottom: 4,
    },
  });

export default RadioButton;
