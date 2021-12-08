import React from "react";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { StyleSheet, View } from "react-native";
import { useColor } from "../../hooks/useColor";
import AppText from "./AppText";
import { format } from "date-fns";

const DatePicker = ({
  label,
  display = "spinner",
  textColor,
  error,
  value,
  ...props
}) => {
  const { colors, dark } = useColor();
  return (
    <View>
      {error && (
        <AppText style={{ color: colors.red }}>{error.message}</AppText>
      )}
      <View style={[defaultStyles(colors).dateInput]}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <AppText style={{ color: colors.placeholderText, fontSize: 14 }}>
            {label}
          </AppText>
          <AppText style={{ color: colors.text, fontSize: 14 }}>
            {format(value, "MM/dd/yyyy")}
          </AppText>
        </View>
        <RNDateTimePicker
          textColor={colors.text}
          themeVariant={dark === true ? "dark" : "light"}
          display={display}
          value={value}
          {...props}
        />
      </View>
    </View>
  );
};

const defaultStyles = (colors) =>
  StyleSheet.create({
    dateInput: {
      borderRadius: 30,
      width: "100%",
      paddingHorizontal: 12,
      backgroundColor: colors?.lightGray,
      paddingVertical: 14,
    },
  });

export default DatePicker;
