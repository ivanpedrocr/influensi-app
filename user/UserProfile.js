import React, { useReducer } from "react";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import AppText from "../components/layout/AppText";
import { AppButton, Typography } from "../components/layout/Native-components";
import { StarRating } from "../components/layout/Star";
import { userInitialState, UserReducer } from "./UserProfile-reducer";

const UserProfile = ({ user, ...props }) => {
  return (
    <View style={{ width: "100%" }}>
      <View style={styles.nameContainer}>
        <View>
          <AppText
            style={{ fontSize: 24 }}
          >{`${user.firstName} ${user.lastName}`}</AppText>
          <AppText style={styles.username}>{user.username}</AppText>
          <AppText>{user.age}</AppText>
          <StarRating rating={user.rating} />
        </View>
        <Image
          style={{
            width: 100,
            height: 100,
            borderRadius: 100,
            borderWidth: 1,
            borderColor: "black",
          }}
          source={{
            uri: "https://i.pinimg.com/474x/9b/47/a0/9b47a023caf29f113237d61170f34ad9.jpg",
          }}
        />
      </View>
      <View style={styles.descriptionContainer}>
        <AppText>{user.description}</AppText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
  },
  username: {
    color: "#1f7fbf",
  },
  descriptionContainer: {
    width: "100%",
    marginTop: 8,
    paddingHorizontal: 24,
  },
});
export default UserProfile;
