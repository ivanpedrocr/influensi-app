import React, { useReducer, useState } from "react";
import { View, StyleSheet, TouchableHighlight, Image } from "react-native";
import { AppButton, AppScreen } from "../components/layout/Native-components";
import SignUpReducer, {
  signUpInitialState,
} from "../components/signUp/SignUp-reducer";
import BasicForm from "../components/BasicForm";
import { signUpForm, validationSchema } from "../components/signUp/SignUp-form";
import {
  launchImageLibraryAsync,
  requestMediaLibraryPermissionsAsync,
} from "expo-image-picker";
import { uploadNewImageSignup } from "../actions/upload-image";
import { useColor } from "../hooks/useColor";
import signupUser from "../actions/signup-user";
import { fetchUserProfile } from "../actions/fetch-user-profile";
import { useForm } from "react-hook-form";
import useYupValidationResolver from "../hooks/useYupValidationResolver";

const SignUpScreen = ({ navigation, route, ...props }) => {
  const resolver = useYupValidationResolver(validationSchema);
  const { colors } = useColor();
  const { handleSubmit, control } = useForm({ resolver });
  const [step, setStep] = useState(0);
  const [userForm, dispatchUserForm] = useReducer(
    SignUpReducer,
    signUpInitialState
  );

  const onSubmit = async (values) => {
    // authDispatch({ type: "LOADING" });
    // await signupUser(user);
    // const token = await auth.currentUser.getIdToken();
    // const loggedInUser = await fetchUserProfile({
    //   userId: auth.currentUser.uid,
    // });
    // authDispatch({
    //   type: "SIGNUP",
    //   payload: { token, userId: auth.currentUser.uid, user: loggedInUser },
    // });
  };

  // const handleImagePicked = async (pickerResult) => {
  //   try {
  //     if (!pickerResult.cancelled) {
  //       const uploadUrl = await uploadNewImageSignup(pickerResult.uri);
  //       dispatchUserForm({
  //         type: "SET_PROFILE_IMAGE",
  //         payload: { image: uploadUrl, uploading: false },
  //       });
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
  // const pickImage = async () => {
  //   const pickerResult = await launchImageLibraryAsync({
  //     allowsEditing: true,
  //     aspect: [3, 3],
  //   });
  //   handleImagePicked(pickerResult);
  // };
  // const handleInput = (payload) => {
  //   dispatchUserForm({
  //     type: "UPDATE_FORM_VALUES",
  //     payload,
  //   });
  // };
  return (
    <AppScreen style={{ padding: 24 }}>
      {/* {step === 0 && (
        <TouchableHighlight
          activeOpacity={0.05}
          style={{
            borderRadius: 100,
            width: 150,
            height: 150,
          }}
          onPress={async () => {
            const { status } = await requestMediaLibraryPermissionsAsync();
            // pickImage();
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
      )} */}
      <BasicForm formMap={signUpForm} control={control} />
      <AppButton
        title="Sign-Up"
        onPress={handleSubmit(onSubmit)}
        style={{ marginTop: 8 }}
      />
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
});

export default SignUpScreen;
