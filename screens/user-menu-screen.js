import { Ionicons } from "@expo/vector-icons";
import React, { useLayoutEffect } from "react";
import {
  Text,
  View,
  Stylesheet,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import AppText from "../components/layout/AppText";
import MenuItemTouchable from "../components/layout/MenuItemTouchable";
import {
  AppButton,
  AppIconButton,
  AppScreen,
} from "../components/layout/Native-components";
import firebase from "firebase";
import { useAuthContext } from "../auth/auth-context";
import { useColor } from "../hooks/useColor";
import { useHeaderButton } from "../hooks/useHeaderButton";
import ToggleTheme from "../components/ToggleTheme";

const UserMenuScreen = ({ navigation, ...props }) => {
  const { colors } = useColor();
  const [authValues, authDispatch] = useAuthContext();
  const menus = [
    { title: "Account", route: "USER_CONFIG" },
    { title: "Languages", route: "LANGUAGES_SETTINGS" },
    { title: "About Us", route: "ABOUT_US" },
    { title: "Terms & Conditions", route: "TERMS_AND_CONDITIONS" },
    { title: "Notifications", route: "NOTIFICATIONS" },
  ];
  useHeaderButton({
    headerRight: () => {
      return (
        <View>
          <AppIconButton
            onPress={() => {
              const signOut = async () => {
                await firebase.auth().signOut();
                authDispatch({ type: "LOGOUT" });
              };
              signOut();
            }}
          >
            <Ionicons name="log-out-outline" color={colors.text} size={28} />
          </AppIconButton>
        </View>
      );
    },
  });
  return (
    <ScrollView>
      <AppScreen>
        {menus.map((menu) => {
          return (
            <MenuItemTouchable
              activeOpacity={0.9}
              key={menu.title}
              onPress={() => navigation.navigate(menu.route)}
            >
              <AppText style={{ fontSize: 18 }}>{menu.title}</AppText>
            </MenuItemTouchable>
          );
        })}
        <ToggleTheme />
      </AppScreen>
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default UserMenuScreen;
