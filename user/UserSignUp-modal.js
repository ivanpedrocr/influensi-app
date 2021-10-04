import React, { useState } from "react";
import { Modal, View, StyleSheet, ScrollView } from "react-native";
import signupUser from "../actions/signup-user";
import {
  AppTextInput,
  AppButton,
} from "../components/layout/Native-components";

const UserSignUpModal = ({ openSignUpModal, onSignUp, ...props }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <Modal visible={openSignUpModal} animationType="slide">
      <View style={styles.modal}>
        <ScrollView
          style={{ width: "100%" }}
          contentContainerStyle={styles.card}
        >
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
            title="Sign-Up"
            onPress={() => {
              onSignUp(email, password);
            }}
            style={{ marginTop: 8 }}
          />
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default UserSignUpModal;
