import React from "react";
import {
  Text,
  View,
  Stylesheet,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import AppText from "../components/layout/AppText";
import { AppButton } from "../components/layout/Native-components";

const UserMenuScreen = ({ navigation, ...props }) => {
  const menus = [
    { title: "Account", route: "USER_CONFIG" },
    { title: "Languages", route: "LANGUAGES_SETTINGS" },
    { title: "About Us", route: "ABOUT_US" },
    { title: "Terms & Conditions", route: "TERMS_AND_CONDITIONS" },
    { title: "Notifications", route: "NOTIFICATIONS" },
  ];
  return (
    <ScrollView>
      <View style={styles.screen}>
        {menus.map((menu) => {
          return (
            <TouchableOpacity
              activeOpacity={0.9}
              key={menu.title}
              style={styles.menu}
              onPress={() => navigation.navigate(menu.route)}
            >
              <AppText>{menu.title}</AppText>
            </TouchableOpacity>
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
  button: {
    width: 100,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: "#2a5bfa",
    justifyContent: "center",
    alignItems: "center",
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
