import React, { useState } from "react";
import {
  StyleSheet,
  TouchableHighlight,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { AppButton, AppScreen } from "../components/layout/Native-components";
import BasicForm from "../components/BasicForm";
import { signUpForm, validationSchema } from "../components/signUp/SignUp-form";
import {
  launchImageLibraryAsync,
  requestMediaLibraryPermissionsAsync,
} from "expo-image-picker";
import { uploadNewImageSignup } from "../actions/upload-image";
import { useColor } from "../hooks/useColor";
import { useForm } from "react-hook-form";
import useYupValidationResolver from "../hooks/useYupValidationResolver";
import InfluencerSignUpView from "../components/signUp/InfluencerSignUp-view";
import BusinessSignUpView from "../components/signUp/BusinessSignUp-view";
import signupUser from "../actions/signup-user";
import { fetchUserProfile } from "../actions/fetch-user-profile";
import { useAuthContext } from "../auth/auth-context";
import firebase from "firebase";

const SignUpScreen = ({ navigation, route, ...props }) => {
  const [authState, authDispatch] = useAuthContext();
  const auth = firebase.auth();
  const resolver = useYupValidationResolver(validationSchema);
  const [profileImage, setProfileImage] = useState({
    image: null,
    uploading: false,
  });
  const { colors } = useColor();
  const { handleSubmit, control, watch } = useForm({ resolver });
  const userType = watch("user_type");

  const onSubmit = async (values) => {
    authDispatch({ type: "LOADING" });
    await signupUser(values);
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
        setProfileImage({ image: uploadUrl, uploading: false });
      }
    } catch (e) {
      console.log(e);
    }
  };
  const pickImage = async () => {
    const pickerResult = await launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [3, 3],
      mediaTypes: "Images",
    });
    handleImagePicked(pickerResult);
  };
  return (
    <AppScreen style={{ padding: 24 }}>
      <ScrollView>
        <BasicForm
          formMap={signUpForm}
          control={control}
          style={{ marginBottom: 8 }}
        />
        {userType === "INFLUENCER" ? (
          <InfluencerSignUpView control={control} />
        ) : userType === "BUSINESS" ? (
          <BusinessSignUpView control={control} />
        ) : null}
        <AppButton
          style={{ marginTop: 8 }}
          title="Create Account"
          onPress={handleSubmit(onSubmit)}
        />
      </ScrollView>
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
