import React, { useLayoutEffect, useReducer } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  Touchable,
  View,
} from "react-native";
import { useState } from "react/cjs/react.development";
import { AppIconButton } from "../components/layout/Native-components";
import { StarRating } from "../components/layout/Star";
import BusinessProfile from "../user/BusinessProfile";
import UserProfile from "../user/UserProfile";
import { UserReducer, userInitialState } from "../user/UserProfile-reducer";
import Icon from "@expo/vector-icons/Ionicons";
import { TouchableOpacity } from "react-native-gesture-handler";

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
            <Icon name="log-out-outline" size={28} />
          </AppIconButton>
          <AppIconButton
            onPress={() => {
              navigation.navigate("USER_MENU");
            }}
            style={{ marginRight: 8 }}
          >
            <Icon size={28} name="settings-outline" color="black" />
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
