import React, { useReducer, useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  AppTextInput,
  AppButton,
} from "../components/layout/Native-components";
import { appColors } from "../styles/app-styles";
import Modal from "react-native-modal";
import SignUpReducer, {
  signUpInitialState,
} from "../components/signUp/SignUp-reducer";
import BasicForm from "../components/BasicForm";
import { signUpForm } from "../components/signUp/SignUp-form";
import RNDateTimePicker from "@react-native-community/datetimepicker";

const UserSignUpModal = ({ isVisible, onSignUp, onClose, ...props }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userForm, dispatchUserForm] = useReducer(
    SignUpReducer,
    signUpInitialState
  );
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
      backgroundColor="white"
      style={{ margin: 0 }}
    >
      <View style={styles.modal}>
        <View style={{ width: "100%" }} contentContainerStyle={styles.card}>
          {/* <AppTextInput
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <AppTextInput
            placeholder="Password"
            value={password}
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
            style={{ marginTop: 8 }}
          /> */}
          <BasicForm
            formMap={signUpForm}
            values={userForm.formValues}
            onChange={handleInput}
          />
          <AppButton
            title="Sign-Up"
            onPress={() => onSignUp(userForm.formValues)}
            style={{ marginTop: 8 }}
          />
          <AppButton
            title="Go Back"
            style={{
              marginTop: 8,
              backgroundColor: appColors.lightGray,
              color: "black",
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
