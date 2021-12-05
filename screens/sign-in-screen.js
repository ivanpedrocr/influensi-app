import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useState } from "react/cjs/react.development";
import { signInUser } from "../actions/signin-user";
import signupUser from "../actions/signup-user";
import { useAuthContext } from "../auth/auth-context";
import {
  AppButton,
  AppScreen,
  AppTextInput,
} from "../components/layout/Native-components";
import UserSignUpModal from "../user/UserSignUp-modal";
import firebase from "firebase";
import { useColor } from "../hooks/useColor";
import { fetchUserProfile } from "../actions/fetch-user-profile";

const SignInScreen = ({ route, navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [authState, authDispatch] = useAuthContext();
  const { colors } = useColor();
  const auth = firebase.auth();
  const onSignIn = async () => {
    authDispatch({ type: "LOADING" });
    await signInUser(email, password);
    const token = await auth.currentUser.getIdToken();
    const loggedInUser = await fetchUserProfile({
      userId: auth.currentUser.uid,
    });
    authDispatch({
      type: "SIGNIN",
      payload: { token, userId: auth.currentUser.uid, user: loggedInUser },
    });
  };
  return (
    <AppScreen style={styles.screen}>
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
              backgroundColor: colors.lightGray,
              color: colors.text,
            }}
            onPress={onSignIn}
          />
          <AppButton
            title="Sign-Up"
            onPress={() => {
              navigation.navigate("SIGNUP");
            }}
            style={{ marginTop: 8 }}
          />
        </ScrollView>
      </View>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    padding: 24,
    width: "100%",
  },
});

export default SignInScreen;
