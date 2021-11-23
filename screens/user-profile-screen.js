import React, { useLayoutEffect, useReducer } from "react";
import { StyleSheet, View } from "react-native";
import { useState } from "react/cjs/react.development";
import { AppIconButton } from "../components/layout/Native-components";
import BusinessProfile from "../user/BusinessProfile";
import UserProfile from "../user/UserProfile";
import Ionicons from "../styles/icons";
import { fetchUserProfile } from "../actions/fetch-user-profile";
import { useAuthContext } from "../auth/auth-context";
import SplashScreen from "./splash-screen";

const UserProfileScreen = ({ navigation, ...props }) => {
  const [authValues, authDispatch] = useAuthContext();
  const [user, setUser] = useState({});
  const [profileImage, setProfileImage] = useState({
    image: null,
    uploading: false,
  });
  const [type, setType] = useState("USER");
  useLayoutEffect(() => {
    (async () => {
      const userData = await fetchUserProfile(authValues);
      setUser(userData);
    })();
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
  }, []);
  return !user.first_name ? (
    <SplashScreen />
  ) : (
    <View style={styles.container}>
      <View style={{ alignSelf: "flex-end", marginBottom: 16 }}></View>
      {type === "USER" ? (
        <UserProfile
          user={user}
          imageUri={profileImage?.image ?? user?.avatar}
          setProfileImageUri={(uri) => {
            setProfileImage((prev) => ({ ...prev, image: uri }));
          }}
        />
      ) : (
        <BusinessProfile />
      )}
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
