import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useState } from "react/cjs/react.development";
import signupUser from "../actions/signup-user";
import {
  AppButton,
  AppTextInput,
} from "../components/layout/Native-components";
import { appColors } from "../styles/app-styles";
import UserSignUpModal from "../user/UserSignUp-modal";

const SignUpScreen = ({ navigation, ...props }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const onSignUp = async (email, password) => {
    await signupUser(email, password);
    setOpenModal(false), navigation.navigate("Explore");
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
          />
          <AppButton
            title="Sign-Up"
            onPress={() => setOpenModal(true)}
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
