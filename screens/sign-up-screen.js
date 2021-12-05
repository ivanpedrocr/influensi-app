import React, { useReducer, useState } from "react";
import { View, StyleSheet, TouchableHighlight, Image } from "react-native";
import { AppButton, AppScreen } from "../components/layout/Native-components";
import SignUpReducer, {
  signUpInitialState,
} from "../components/signUp/SignUp-reducer";
import BasicForm from "../components/BasicForm";
import { signUpForm } from "../components/signUp/SignUp-form";
import {
  launchImageLibraryAsync,
  requestMediaLibraryPermissionsAsync,
} from "expo-image-picker";
import { uploadNewImageSignup } from "../actions/upload-image";
import { useColor } from "../hooks/useColor";
import signupUser from "../actions/signup-user";
import { fetchUserProfile } from "../actions/fetch-user-profile";

const SignUpScreen = ({ navigation, route, isVisible, onClose, ...props }) => {
  const { colors } = useColor();
  const [userForm, dispatchUserForm] = useReducer(
    SignUpReducer,
    signUpInitialState
  );

  const onSignUp = async (user) => {
    authDispatch({ type: "LOADING" });
    await signupUser(user);
    const token = await auth.currentUser.getIdToken();
    const loggedInUser = await fetchUserProfile({
      userId: auth.currentUser.uid,
    });
    authDispatch({
      type: "SIGNUP",
      payload: { token, userId: auth.currentUser.uid, user: loggedInUser },
    });
  };

  const handleImagePicked = async (pickerResult) => {
    try {
      if (!pickerResult.cancelled) {
        const uploadUrl = await uploadNewImageSignup(pickerResult.uri);
        dispatchUserForm({
          type: "SET_PROFILE_IMAGE",
          payload: { image: uploadUrl, uploading: false },
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  const pickImage = async () => {
    const pickerResult = await launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [3, 3],
    });
    handleImagePicked(pickerResult);
  };

  const handleInput = (payload) => {
    dispatchUserForm({
      type: "UPDATE_FORM_VALUES",
      payload,
    });
  };
  return (
    <AppScreen>
      <View style={styles.modal}>
        <View style={{ width: "100%" }} contentContainerStyle={styles.card}>
          <TouchableHighlight
            activeOpacity={0.05}
            style={{
              borderRadius: 100,
              width: 150,
              height: 150,
            }}
            onPress={async () => {
              const { status } = await requestMediaLibraryPermissionsAsync();
              pickImage();
            }}
          >
            <Image
              source={{ uri: userForm.formValues.profileImage.image }}
              style={{
                width: 150,
                height: 150,
                borderWidth: 2,
                borderColor: "black",
                borderRadius: 100,
              }}
            />
          </TouchableHighlight>
          <BasicForm
            formMap={signUpForm}
            values={userForm.formValues}
            onChange={handleInput}
          />
          <AppButton
            title="Sign-Up"
            onPress={() =>
              onSignUp({
                ...userForm.formValues,
                avatar: userForm.formValues.profileImage.image,
              })
            }
            style={{ marginTop: 8 }}
          />
        </View>
      </View>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
});

export default SignUpScreen;
