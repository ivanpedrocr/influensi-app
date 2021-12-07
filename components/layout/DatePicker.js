import RNDateTimePicker from "@react-native-community/datetimepicker";
import React from "react";
import { View } from "react-native";
import { useColor } from "../../hooks/useColor";
import AppText from "./AppText";

const DatePicker = (props) => {
  const { colors, dark } = useColor();
  return (
    <View>
      {props.error && (
        <AppText style={{ color: colors.red }}>{props.error.message}</AppText>
      )}
      <RNDateTimePicker
        textColor={colors.primary}
        themeVariant={dark ? "dark" : "light"}
        {...props}
      />
    </View>
  );
};

export default DatePicker;
