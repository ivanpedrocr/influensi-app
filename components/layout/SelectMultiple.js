import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import AppText from "./AppText";
import Icon from "../../styles/icons";
import MenuItemTouchable from "./MenuItemTouchable";
import { useColor } from "../../hooks/useColor";
import { AppTextInput } from "./Native-components";

const SelectMultiple = ({
  onSelect = (value) => {},
  options = [],
  values = {},
  style = {},
  label,
}) => {
  const { colors } = useColor();
  const [open, setOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const SelectListItem = ({ label, value, selected, onSelect, onDeselect }) => {
    const { [value]: c, ...rest } = values;

    return (
      <MenuItemTouchable
        onPress={() =>
          onSelect(selected ? { ...rest } : { ...values, [value]: true })
        }
      >
        <View style={styles(colors).selectListItemTouchable}>
          <View style={styles(colors, selected).checkbox}>
            <Icon
              name="checkmark-sharp"
              color={selected ? colors.primary : colors.background}
              adjustsFontSizeToFit
              style={{
                fontSize: 24,
              }}
            />
          </View>
          <AppText>{label}</AppText>
        </View>
      </MenuItemTouchable>
    );
  };

  const SelectMultipleList = ({ data, style }) => {
    return (
      <FlatList
        style={style}
        data={data}
        keyExtractor={(item) => item.label}
        renderItem={({ item }) => (
          <SelectListItem
            label={item.label}
            value={item.value}
            selected={values[item.value]}
            onSelect={onSelect}
          />
        )}
        contentContainerStyle={styles(colors).selectMultipleList}
      />
    );
  };
  return (
    <>
      <AppTextInput
        label={label}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onChangeText={(text) => setSearchInput(text)}
        value={searchInput}
      />
      <SelectMultipleList
        data={options.filter(({ label }) =>
          label?.toUpperCase().includes(searchInput.toUpperCase())
        )}
        style={{ display: open ? "flex" : "none" }}
      />
    </>
  );
};

const styles = (colors, isSelected) =>
  StyleSheet.create({
    selectListItemTouchable: {
      flexDirection: "row",
      alignItems: "center",
    },
    selectMultipleList: {},
    container: {},
    checkbox: {
      height: 20,
      width: 20,
      borderRadius: 8,
      borderWidth: 2,
      borderColor: isSelected ? colors?.primary : colors?.lightGray,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 4,
    },
  });

export default SelectMultiple;
