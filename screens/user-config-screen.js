import React, { useReducer, useState } from "react";
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import AppText from "../components/layout/AppText";
import {
  AppButton,
  AppScreen,
  AppTextInput,
  Container,
  TypingInput,
} from "../components/layout/Native-components";
import { userInitialState, UserReducer } from "../user/UserProfile-reducer";
import { camelize } from "../utils/camelize";

const UserConfigScreen = () => {
  const [userValues, dispatch] = useReducer(UserReducer, userInitialState);
  const fields = [
    { name: "username" },
    { name: "First Name" },
    { name: "Last Name" },
    { name: "Age" },
    { name: "Description" },
  ];
  return (
    <AppScreen>
      {fields.map((field) => {
        return (
          <View
            key={field.name}
            style={{
              alignItems: "center",
              justifyContent: "center",
              margin: 8,
              width: "100%",
              paddingHorizontal: 20,
            }}
          >
            <AppText>{field.name}</AppText>
            <AppTextInput
              autoCapitalize="none"
              value={userValues[`${camelize(field.name)}`]}
              onChangeText={(text) => {
                dispatch({
                  type: `${field.name.replace(/ /g, "_").toUpperCase()}`,
                  payload: { [`userValues.${camelize(field.name)}`]: text },
                });
              }}
            />
          </View>
        );
      })}
      <AppButton
        style={{ margin: 8 }}
        title="Save"
        onPress={() => {
          dispatch({
            type: "ADD_USER",
            payload: userValues,
          });
        }}
      />
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  textInput: {
    margin: 4,
    borderRadius: 8,
    height: "auto",
    borderWidth: 1,
    width: "100%",
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  description: {
    margin: 4,
    borderRadius: 8,
    width: "100%",
    height: "auto",
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
});

export default UserConfigScreen;
