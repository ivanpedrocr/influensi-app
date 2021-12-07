import React, { useState } from "react";
import {
  StyleSheet,
  TouchableHighlight,
  Image,
  ScrollView,
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

const SignUpScreen = ({ navigation, route, ...props }) => {
  const resolver = useYupValidationResolver(validationSchema);
  const [profileImage, setProfileImage] = useState({
    image: null,
    uploading: false,
  });
  const { colors } = useColor();
  const { handleSubmit, control, watch } = useForm({ resolver });
  const userType = watch("user_type");

  const onSubmit = async (values) => {
    console.log(values);
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
    });
    handleImagePicked(pickerResult);
  };
  return (
    <AppScreen style={{ padding: 24 }}>
      <ScrollView>
        <TouchableHighlight
          activeOpacity={0.05}
          style={{
            borderRadius: 100,
            width: 150,
            height: 150,
          }}
          onPress={async () => {
            const { status } = await requestMediaLibraryPermissionsAsync();
            if (status === "granted") {
              pickImage();
            }
          }}
        >
          <Image
            source={{ uri: profileImage.image }}
            style={{
              width: 150,
              height: 150,
              borderWidth: 2,
              borderColor: "black",
              borderRadius: 100,
            }}
          />
        </TouchableHighlight>
        <BasicForm formMap={signUpForm} control={control} />
        {userType === "INFLUENCER" && (
          <InfluencerSignUpView control={control} />
        )}
        {userType === "BUSINESS" && <BusinessSignUpView control={control} />}
        <AppButton
          title="Sign-Up"
          onPress={handleSubmit(onSubmit, (errors) => console.log(errors))}
          style={{ marginTop: 8 }}
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
