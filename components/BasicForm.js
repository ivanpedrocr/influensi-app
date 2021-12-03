import RNDateTimePicker from "@react-native-community/datetimepicker";
import React from "react";
import { View } from "react-native";
import { useColor } from "../hooks/useColor";
import { AppTextInput } from "./layout/Native-components";
import { Picker } from "@react-native-picker/picker";
import RadioButton from "./layout/RadioButton";

const BasicForm = ({ formMap, onChange, values, style, ...props }) => {
  const { colors, dark } = useColor();
  return (
    <View>
      {formMap.map((field, i) => {
        switch (field.type) {
          case "text":
            return (
              <AppTextInput
                key={field.name}
                value={values[field.name] ?? ""}
                onChangeText={(text) => {
                  onChange({ [field.name]: text });
                }}
                {...field}
              />
            );
          case "date-picker":
            return (
              <RNDateTimePicker
                key={field.name}
                value={values[field.name]}
                onChange={(e, date) => {
                  onChange({ [field.name]: date });
                }}
                themeVariant={dark ? "dark" : "light"}
                textColor={colors.primary}
                {...field}
              />
            );
          case "picker":
            return (
              <Picker
                key={field.name}
                selectedValue={values[field.name]}
                onValueChange={(value) => {
                  onChange({ [field.name]: value });
                }}
              >
                {field?.options?.map(({ label, value }) => (
                  <Picker.Item label={label} value={value} key={label} />
                ))}
              </Picker>
            );
          case "radio_button":
            return (
              <RadioButton
                key={field.name}
                onSelect={(value) => onChange({ [field.name]: value })}
                values={values[field.name]}
                {...field}
              />
            );
        }
      })}
    </View>
  );
};

export default BasicForm;
