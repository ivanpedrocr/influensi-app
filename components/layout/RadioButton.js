import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useColor } from "../../hooks/useColor";
import AppText from "./AppText";

const RadioButton = ({ style, onSelect, label, value, options, error }) => {
  const { colors } = useColor();
  const RadioButtonItem = ({ item, label }) => (
    <View key={item}>
      <TouchableOpacity
        onPress={() => {
          onSelect(item);
        }}
      >
        <View style={styles().itemContainer}>
          <View style={[styles(colors, value === item).item, style]}>
            <View style={styles(colors, value === item).itemInnerButton} />
          </View>
          <AppText style={styles().itemLabel}>{label}</AppText>
        </View>
      </TouchableOpacity>
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

const styles = (colors, isSelected) =>
  StyleSheet.create({
    itemContainer: {
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
    },
    itemLabel: {
      fontWeight: "400",
      paddingBottom: 4,
    },
    itemInnerButton: {
      height: "75%",
      width: "75%",
      borderRadius: 20,
      backgroundColor: colors?.primary,
      display: isSelected ? "flex" : "none",
    },
    item: {
      height: 24,
      width: 24,
      borderRadius: 20,
      borderWidth: 2,
      borderColor: isSelected ? colors?.primary : colors?.lightGray,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 4,
    },
  });

export default RadioButton;
