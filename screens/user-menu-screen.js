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
} from "../components/layout/Native-components";
import firebase from "firebase";
import { useAuthContext } from "../auth/auth-context";

const UserMenuScreen = ({ navigation, ...props }) => {
  const [authValues, authDispatch] = useAuthContext();
  const menus = [
    { title: "Account", route: "USER_CONFIG" },
    { title: "Languages", route: "LANGUAGES_SETTINGS" },
    { title: "About Us", route: "ABOUT_US" },
    { title: "Terms & Conditions", route: "TERMS_AND_CONDITIONS" },
    { title: "Notifications", route: "NOTIFICATIONS" },
  ];
  useLayoutEffect(() => {
    navigation.setOptions({
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
              <Ionicons name="log-out-outline" color="black" size={28} />
            </AppIconButton>
          </View>
        );
      },
    });
  });
  return (
    <ScrollView>
      <View style={styles.screen}>
        {menus.map((menu) => {
          return (
            <MenuItemTouchable
              activeOpacity={0.9}
              key={menu.title}
              style={styles.menu}
              onPress={() => navigation.navigate(menu.route)}
            >
              <AppText>{menu.title}</AppText>
            </MenuItemTouchable>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white",
  },
  menu: {
    width: "100%",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderColor: "#a6a6a6",
    borderBottomWidth: 1,
    marginVertical: 1,
  },
});

export default UserMenuScreen;
