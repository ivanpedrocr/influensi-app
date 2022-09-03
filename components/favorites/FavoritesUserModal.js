import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import ReactNativeModal from "react-native-modal";
import { appColors } from "../../styles/app-styles";
import AppText from "../layout/AppText";
import { AppButton } from "../layout/Native-components";

const FavoritesUserModal = ({
  isVisible,
  closeModal,
  sendMessage,
  ...props
}) => {
  return (
    <ReactNativeModal
      isVisible={isVisible}
      onBackdropPress={closeModal}
      backdropOpacity={0.2}
      animationIn="zoomIn"
      style={styles.modal}
      animationOut="zoomOut"
    >
      <View style={styles.menu}>
        <TouchableOpacity style={styles.options}>
          <AppText>User Profile</AppText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.options} onPress={sendMessage}>
          <AppText>Send Message</AppText>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ ...styles.options, borderBottomWidth: 0 }}
          onPress={() => {
            props.onDelete();
            closeModal();
          }}
        >
          <AppText style={{ color: appColors.red }}>Delete</AppText>
        </TouchableOpacity>
      </View>
    </ReactNativeModal>
  );
};

const styles = StyleSheet.create({
  options: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderColor: appColors.accentGray,
    borderBottomWidth: 1,
    borderRadius: 12,
  },
  menu: {
    backgroundColor: "white",
    borderRadius: 16,
  },
  modal: {},
});

export default FavoritesUserModal;
