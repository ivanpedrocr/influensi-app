import React, { useLayoutEffect, useReducer } from "react";
import { StyleSheet, View } from "react-native";
import { useState } from "react/cjs/react.development";
import { AppIconButton } from "../components/layout/Native-components";
import BusinessProfile from "../user/BusinessProfile";
import UserProfile from "../user/UserProfile";
import { UserReducer, userInitialState } from "../user/UserProfile-reducer";
import Ionicons from "../styles/icons";

const UserProfileScreen = ({ navigation, ...props }) => {
  const [user, dispatch] = useReducer(UserReducer, userInitialState);
  const [type, setType] = useState("USER");
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: "row" }}>
          <AppIconButton
            style={{ marginRight: 8 }}
            onPress={() => {
              setType(type === "USER" ? "BUSINESS" : "USER");
            }}
          >
            <Ionicons name="log-out-outline" size={28} />
          </AppIconButton>
          <AppIconButton
            onPress={() => {
              navigation.navigate("USER_MENU");
            }}
            style={{ marginRight: 8 }}
          >
            <Ionicons size={28} name="settings-outline" color="black" />
          </AppIconButton>
        </View>
      ),
    });
  }, [navigation, type]);

  return (
    <View style={styles.container}>
      <View style={{ alignSelf: "flex-end", marginBottom: 16 }}></View>
      {type === "USER" ? <UserProfile user={user} /> : <BusinessProfile />}
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
