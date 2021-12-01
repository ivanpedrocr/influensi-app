import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import ReactNativeModal from "react-native-modal";
import { useColor } from "../../hooks/useColor";
import AppText from "../layout/AppText";

const FavoritesUserModal = ({
  isVisible,
  closeModal,
  sendMessage,
  user,
  ...props
}) => {
  const { colors } = useColor();
  const navigation = useNavigation();
  return (
    <ReactNativeModal
      isVisible={isVisible}
      onBackdropPress={closeModal}
      backdropOpacity={0.2}
      animationIn="zoomIn"
      style={styles(colors).modal}
      animationOut="zoomOut"
    >
      <View style={styles(colors).menu}>
        <TouchableOpacity
          style={styles(colors).options}
          onPress={() => {
            navigation.navigate("PROFILE", { user });
            closeModal();
          }}
        >
          <AppText>User Profile</AppText>
        </TouchableOpacity>
        <TouchableOpacity style={styles(colors).options} onPress={sendMessage}>
          <AppText>Send Message</AppText>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ ...styles(colors).options, borderBottomWidth: 0 }}
          onPress={() => {
            props.onDelete();
            closeModal();
          }}
        >
          <AppText style={{ color: colors.red }}>Delete</AppText>
        </TouchableOpacity>
      </View>
    </ReactNativeModal>
  );
};

const styles = (colors) =>
  StyleSheet.create({
    options: {
      paddingVertical: 16,
      paddingHorizontal: 16,
      borderColor: colors.accentGray,
      borderBottomWidth: 1,
      borderRadius: 12,
    },
    menu: {
      backgroundColor: colors.background,
      borderRadius: 16,
    },
    modal: {},
  });

export default FavoritesUserModal;
