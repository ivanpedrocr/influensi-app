import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import ReactNativeModal from "react-native-modal";
import { useColor } from "../../hooks/useColor";
import UserCard from "../../user/UserCard";
import AppText from "../layout/AppText";
import UserProfileCard from "../UserProfileCard";

const FavoritesUserModal = ({
  isVisible,
  closeModal,
  sendMessage,
  user,
  ...props
}) => {
  const { colors } = useColor();
  const [showUserProfile, setShowUserProfile] = useState(false);
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
            setShowUserProfile(true);
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
      <ReactNativeModal
        isVisible={showUserProfile}
        onBackdropPress={() => {
          setShowUserProfile(false);
        }}
      >
        <UserProfileCard user={user} />
      </ReactNativeModal>
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
