import RNDateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { View } from "react-native";
import { AppTextInput } from "./layout/Native-components";

const BasicForm = ({ formMap, onChange, values, ...props }) => {
  return (
    <View>
      {formMap.map((field, i) => {
        switch (field.type) {
          case "text":
            return (
              <AppTextInput
                key={i}
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
                key={i}
                value={values[field.name]}
                onChange={(e, date) => {
                  onChange({ [field.name]: date });
                }}
                {...field}
              />
            );
        }
      })}
    </View>
  );
};

export default BasicForm;
