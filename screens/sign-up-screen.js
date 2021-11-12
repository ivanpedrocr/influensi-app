import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useState } from "react/cjs/react.development";
import { signInUser } from "../actions/signin-user";
import signupUser from "../actions/signup-user";
import { useAuthContext } from "../auth/auth-context";
import {
  AppButton,
  AppTextInput,
} from "../components/layout/Native-components";
import { appColors } from "../styles/app-styles";
import UserSignUpModal from "../user/UserSignUp-modal";
import firebase from "firebase";

const SignUpScreen = ({ navigation, ...props }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [authState, authDispatch] = useAuthContext();
  const auth = firebase.auth();
  const onSignUp = async (email, password) => {
    authDispatch({ type: "LOADING" });
    await signupUser(email, password);
    const token = await auth.currentUser.getIdToken();
    console.log(auth.currentUser);
    authDispatch({
      type: "SIGNUP",
      payload: { token, userId: auth.currentUser.uid },
    });
  };
  const onSignIn = async () => {
    authDispatch({ type: "LOADING" });
    await signInUser(email, password);
    const token = await auth.currentUser.getIdToken();
    authDispatch({
      type: "SIGNIN",
      payload: { token, userId: auth.currentUser.uid },
    });
  };
  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        <ScrollView>
          <AppTextInput
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
          />
          <AppButton
            title="Sign-In"
            style={{
              marginTop: 8,
              backgroundColor: appColors.lightGray,
              color: "black",
            }}
            onPress={onSignIn}
          />
          <AppButton
            title="Sign-Up"
            onPress={() => {
              setOpenModal(true);
              console.log(authState);
            }}
            style={{ marginTop: 8 }}
          />
        </ScrollView>
      </View>
      <UserSignUpModal
        isVisible={openModal}
        onSignUp={onSignUp}
        onClose={() => setOpenModal(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  card: {
    padding: 24,
    width: "100%",
  },
});
export default SignUpScreen;
