import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { updateUserValues } from "../actions/update-user-values";
import firebase from "firebase";
import { useAuthContext } from "../auth/auth-context";
import BasicForm from "../components/BasicForm";
import { AppButton, AppScreen } from "../components/layout/Native-components";
import {
  SelectMultipleField,
  TextField,
} from "../components/signUp/FormField-model";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";

const UserConfigScreen = () => {
  const { control, handleSubmit } = useForm();
  const [authValues, authDispatch] = useAuthContext();
  const { first_name, last_name, username } = authValues.user;
  const [loadedCategories, setLoadedCategories] = useState([]);

  useEffect(() => {
    (async () => {
      const fetchedCategories = await firebase
        .database()
        .ref(`categories`)
        .get()
        .then((snapshot) => snapshot.val());
      if (fetchedCategories) {
        setLoadedCategories(
          Object.keys(fetchedCategories).map((category) => ({
            value: category.toUpperCase(),
            label: capitalizeFirstLetter(category),
          }))
        );
      }
    })();
  }, []);

  const configurationFields = [
    new TextField("username", {
      placeholder: "username",
      style: styles.textInput,
      defaultValue: username,
      label: "Username",
    }),
    new TextField("first_name", {
      placeholder: "First Name",
      style: styles.textInput,
      defaultValue: first_name,
      label: "First Name",
    }),
    new TextField("last_name", {
      placeholder: "Last Name",
      style: styles.textInput,
      defaultValue: last_name,
      label: "Last Name",
    }),
    new SelectMultipleField("categories", {
      label: "Categories",
      options: loadedCategories,
    }),
  ];
  const saveFormValues = async (values) => {
    console.log(values);
    // try {
    //   await updateUserValues(authValues, values);
    //   authDispatch({ type: "UPDATE_USER", payload: { user: values } });
    // } catch (e) {
    //   console.log(e);
    // }
  };
  return (
    <AppScreen style={{ padding: 24 }}>
      <BasicForm formMap={configurationFields} control={control} />
      <AppButton title="Save" onPress={handleSubmit(saveFormValues)} />
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  textInput: {
    marginBottom: 8,
  },
  description: {
    borderRadius: 8,
    width: "100%",
    height: "auto",
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
});

export default UserConfigScreen;
