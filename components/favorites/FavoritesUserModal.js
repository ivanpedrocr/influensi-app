import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import ReactNativeModal from "react-native-modal";
import AppText from "../layout/AppText";
import { AppButton } from "../layout/Native-components";

const FavoritesUserModal = ({ isVisible, closeModal, ...props }) => {
  return (
    <ReactNativeModal
      isVisible={isVisible}
      onBackdropPress={closeModal}
      backdropOpacity={0.2}
      animationIn="zoomIn"
      style={styles.modal}
    >
      <View style={styles.menu}>
        <TouchableOpacity style={styles.options}>
          <AppText>User Profile</AppText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.options}>
          <AppText>Send Message</AppText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.options} onPress={props.onDelete}>
          <AppText style={{ color: "red" }}>Delete</AppText>
        </TouchableOpacity>
      </View>
    </ReactNativeModal>
  );
};

const styles = StyleSheet.create({
  options: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderColor: "#a6a6a6",
    borderBottomWidth: 1,
    borderRadius: 12,
  },
  menu: {
    backgroundColor: "white",
    borderRadius: 12,
  },
  modal: {},
});

export default FavoritesUserModal;
