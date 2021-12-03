import React, { useReducer } from "react";
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { updateUserValues } from "../actions/update-user-values";
import { useAuthContext } from "../auth/auth-context";
import BasicForm from "../components/BasicForm";
import { AppButton, AppScreen } from "../components/layout/Native-components";
import { TextField } from "../components/signUp/FormField-model";
import { userInitialState, UserReducer } from "../user/UserProfile-reducer";

const UserConfigScreen = () => {
  const [authValues, authDispatch] = useAuthContext();
  const { first_name, last_name, username } = authValues.user;
  const [formValue, dispatch] = useReducer(UserReducer, {
    first_name,
    last_name,
    username,
  });
  const configurationFields = [
    new TextField("username", {
      placeholder: "username",
      style: styles.textInput,
    }),
    new TextField("first_name", {
      placeholder: "First Name",
      style: styles.textInput,
    }),
    new TextField("last_name", {
      placeholder: "Last Name",
      style: styles.textInput,
    }),
  ];
  const handleInput = (value) =>
    dispatch({ type: "UPDATE_USER", payload: value });
  const saveFormValues = async () => {
    try {
      await updateUserValues(authValues, formValue);
      authDispatch({ type: "UPDATE_USER", payload: { user: formValue } });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <AppScreen>
      <BasicForm
        formMap={configurationFields}
        values={formValue}
        onChange={handleInput}
      />
      <AppButton
        style={{ margin: 8 }}
        title="Save"
        onPress={() => {
          saveFormValues();
        }}
      />
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  textInput: {
    margin: 4,
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
