import React from "react";
import { StyleSheet, TouchableHighlight, View } from "react-native";
import { useColor } from "../../hooks/useColor";
import AppText from "./AppText";

const RadioButton = ({ style, onSelect, label, value, options, error }) => {
  const { colors } = useColor();
  const RadioButtonItem = ({ item, label }) => (
    <View style={styles().itemContainer} key={item}>
      <AppText style={styles().itemLabel}>{label}</AppText>
      <TouchableHighlight
        onPress={() => {
          console.log(item);
          onSelect(item);
        }}
        style={[styles(colors).item, style]}
      >
        {value === item ? (
          <View style={styles(colors).itemInnerButton} />
        ) : (
          <></>
        )}
      </TouchableHighlight>
    </View>
  );
  return (
    <View>
      {error && (
        <AppText style={{ color: colors.red, alignSelf: "center" }}>
          {error.message}
        </AppText>
      )}
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        {options.map(({ label, item }) => (
          <RadioButtonItem label={label} item={item} key={item} />
        ))}
      </View>
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
