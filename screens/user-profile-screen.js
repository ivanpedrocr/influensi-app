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

const UserProfileScreen = ({ navigation, route, ...props }) => {
  const [authValues, authDispatch] = useAuthContext();
  const { colors } = useColor();
  const { user } = route.params || authValues;
  const [profileImage, setProfileImage] = useState({
    image: null,
    uploading: false,
  });
  useHeaderButton({
    headerRight: () => (
      <View style={{ flexDirection: "row" }}>
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
  return !user?.username ? (
    <SplashScreen />
  ) : (
    <AppScreen>
      <UserProfile
        user={user}
        imageUri={profileImage?.image ?? user?.avatar}
        setProfileImageUri={(uri) => {
          setProfileImage((prev) => ({ ...prev, image: uri }));
        }}
      />
    </AppScreen>
  );
};
export default UserProfileScreen;
