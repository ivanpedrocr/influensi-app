import React, { useState } from "react";
import { Modal, View, StyleSheet, ScrollView } from "react-native";
import signupUser from "../actions/signup-user";
import {
  AppTextInput,
  AppButton,
  AppIconButton,
} from "../components/layout/Native-components";
import { Ionicons } from "@expo/vector-icons";
import { appColors } from "../styles/app-styles";

const UserSignUpModal = ({ openSignUpModal, onSignUp, onClose, ...props }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <Modal visible={openSignUpModal} animationType="slide">
      <View style={styles.modal}>
        <View style={{ width: "100%" }} contentContainerStyle={styles.card}>
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
            onPress={() => onSignUp(email, password)}
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
