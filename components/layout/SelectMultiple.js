import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import AppText from "./AppText";
import Icon from "../../styles/icons";
import MenuItemTouchable from "./MenuItemTouchable";
import { useColor } from "../../hooks/useColor";
import { AppTextInput } from "./Native-components";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";

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
  const SelectListItem = ({ label, value, selected, onSelect }) => {
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
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {values &&
          Object?.keys?.(values).map((value, i) => {
            const { [value]: c, ...rest } = values;
            return (
              <TouchableOpacity
                key={`selection-${i}`}
                activeOpacity={1}
                onPress={() => onSelect(rest)}
              >
                <View style={styles(colors).selectedText}>
                  <AppText key={value}>
                    {capitalizeFirstLetter(value?.toLowerCase())}
                  </AppText>
                </View>
              </TouchableOpacity>
            );
          })}
      </View>
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
    selectedText: {
      borderColor: colors?.background,
      borderWidth: 2,
      padding: 6,
      backgroundColor: colors?.primary,
      borderRadius: 20,
    },
  });

export default SelectMultiple;
