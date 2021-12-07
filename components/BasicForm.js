import RNDateTimePicker from "@react-native-community/datetimepicker";
import React from "react";
import { View } from "react-native";
import { useColor } from "../hooks/useColor";
import { AppTextInput } from "./layout/Native-components";
import { Picker } from "@react-native-picker/picker";
import RadioButton from "./layout/RadioButton";
import { Controller } from "react-hook-form";
import DatePicker from "./layout/DatePicker";

const BasicForm = ({
  formMap,
  onChange,
  values,
  style,
  validationSchema,
  control,
  ...props
}) => {
  const { colors, dark } = useColor();
  return (
    <View>
      {formMap.map((field, i) => {
        switch (field.type) {
          case "text":
            return (
              <Controller
                key={field.name}
                control={control}
                name={field.name}
                defaultValue=""
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <AppTextInput
                    key={field.name}
                    value={value}
                    onChangeText={(text) => {
                      onChange(text);
                    }}
                    onBlur={onBlur}
                    error={error}
                    {...field}
                  />
                )}
              />
            );
          case "date-picker":
            return (
              <Controller
                key={field.name}
                control={control}
                name={field.name}
                defaultValue={new Date()}
                render={({ field: { onChange, onBlur, value } }) => (
                  <DatePicker
                    key={field.name}
                    value={value}
                    onChange={(e, date) => {
                      onChange(date);
                    }}
                    {...field}
                  />
                )}
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
              <Controller
                key={field.name}
                control={control}
                name={field.name}
                defaultValue=""
                render={({
                  field: { onChange, onBlur, value },
                  fieldState,
                }) => (
                  <RadioButton
                    key={field.name}
                    error={fieldState.error}
                    onSelect={(value) => onChange(value)}
                    value={value}
                    {...field}
                  />
                )}
              />
            );
        }
      })}
    </View>
  );
};

export default BasicForm;
