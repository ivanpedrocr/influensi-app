import React, { useLayoutEffect, useReducer } from "react";
import { StyleSheet, View } from "react-native";
import { useEffect, useState } from "react/cjs/react.development";
import {
  AppIconButton,
  AppScreen,
} from "../components/layout/Native-components";
import BusinessProfile from "../user/BusinessProfile";
import UserProfile from "../user/UserProfile";
import Ionicons from "../styles/icons";
import { fetchUserProfile } from "../actions/fetch-user-profile";
import { useAuthContext } from "../auth/auth-context";
import SplashScreen from "./splash-screen";
import { useHeaderButton } from "../hooks/useHeaderButton";
import { useColor } from "../hooks/useColor";

const UserProfileScreen = ({ navigation, ...props }) => {
  const [authValues, authDispatch] = useAuthContext();
  const [user, setUser] = useState({});
  const [profileImage, setProfileImage] = useState({
    image: null,
    uploading: false,
  });
  const [type, setType] = useState("USER");
  const { colors } = useColor();
  useEffect(() => {
    (async () => {
      const userData = await fetchUserProfile(authValues);
      setUser(userData);
    })();
  }, []);
  useHeaderButton({
    headerRight: () => (
      <View style={{ flexDirection: "row" }}>
        <AppIconButton
          style={{ marginRight: 8 }}
          onPress={() => {
            setType(type === "USER" ? "BUSINESS" : "USER");
          }}
        >
          <Ionicons name="log-out-outline" size={28} color={colors.text} />
        </AppIconButton>
        <AppIconButton
          onPress={() => {
            navigation.navigate("USER_MENU");
          }}
          style={{ marginRight: 8 }}
        >
          <Ionicons size={28} name="settings-outline" color={colors.text} />
        </AppIconButton>
      </View>
    ),
  });
  return !user.first_name ? (
    <SplashScreen />
  ) : (
    <AppScreen>
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
    </AppScreen>
  );
};
export default UserProfileScreen;
