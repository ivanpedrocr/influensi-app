import React, { useReducer, useState } from "react";
import { View, StyleSheet, TouchableHighlight, Image } from "react-native";
import { AppButton } from "../components/layout/Native-components";
import Modal from "react-native-modal";
import SignUpReducer, {
  signUpInitialState,
} from "../components/signUp/SignUp-reducer";
import BasicForm from "../components/BasicForm";
import { signUpForm } from "../components/signUp/SignUp-form";
import {
  launchImageLibraryAsync,
  requestMediaLibraryPermissionsAsync,
} from "expo-image-picker";
import { uploadImage, uploadNewImageSignup } from "../actions/upload-image";
import { useColor } from "../hooks/useColor";

const UserSignUpModal = ({ isVisible, onSignUp, onClose, ...props }) => {
  const { colors } = useColor();
  const [userForm, dispatchUserForm] = useReducer(
    SignUpReducer,
    signUpInitialState
  );
  const [profileImage, setProfileImage] = useState({
    image: null,
    uploading: false,
  });
  const handleImagePicked = async (pickerResult) => {
    try {
      if (!pickerResult.cancelled) {
        const uploadUrl = await uploadNewImageSignup(pickerResult.uri);
        setProfileImage((p) => ({ ...p, image: uploadUrl }));
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
    <Modal
      isVisible={isVisible}
      backdropOpacity={1}
      backgroundColor={colors.background}
      style={{ margin: 0 }}
    >
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
          <BasicForm
            formMap={signUpForm}
            values={userForm.formValues}
            onChange={handleInput}
          />
          <AppButton
            title="Sign-Up"
            onPress={() =>
              onSignUp({ ...userForm.formValues, avatar: profileImage.image })
            }
            style={{ marginTop: 8 }}
          />
          <AppButton
            title="Go Back"
            style={{
              marginTop: 8,
              backgroundColor: colors.lightGray,
              color: colors.text,
            }}
            onPress={onClose}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
    width: "100%",
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
});

export default UserSignUpModal;
