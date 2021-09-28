import React, { useReducer } from "react";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { AppButton, Typography } from "../components/layout/Native-components";
import { StarRating } from "../components/layout/Star";
import UserProfile from "../user/UserProfile";
import { UserReducer, userInitialState } from "../user/UserProfile-reducer";

const UserProfileScreen = ({ navigation, ...props }) => {
  const [user, dispatch] = useReducer(UserReducer, userInitialState);
  return (
    <View style={styles.container}>
      <View style={{ alignSelf: "flex-end", marginBottom: 16 }}>
        <AppButton
          title="Settings"
          onPress={() => {
            navigation.navigate("USER_MENU");
          }}
        />
      </View>
      <UserProfile user={user} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "flex-start",
    width: "100%",
    alignItems: "flex-start",
  },
});
export default UserProfileScreen;
