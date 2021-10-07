import { useFocusEffect } from "@react-navigation/core";
import React, { useEffect } from "react";
import {
  Text,
  View,
  Stylesheet,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useState } from "react/cjs/react.development";
import { fetchFavoriteUsersList } from "../actions/favorite-user";
import AppText from "../components/layout/AppText";
import { appColors } from "../styles/app-styles";
import SplashScreen from "./splash-screen";

const FavoritesScreen = ({ navigation, ...props }) => {
  const [favoritesList, setFavoritesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const getFavoritesList = async () => {
        setIsLoading(true);
        const usersList = await fetchFavoriteUsersList();
        setFavoritesList(Object.values(usersList));
        setIsLoading(false);
      };
      getFavoritesList();
    }, [])
  );
  const openUserMenu = () => {};
  if (isLoading) {
    return <SplashScreen />;
  }
  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <View style={styles.screen}>
        {favoritesList
          .map((user, i) => (
            <View style={styles.userListContainer} key={i}>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  width: "100%",
                  flex: 1,
                }}
              >
                <View style={styles.userListItem}>
                  <AppText
                    style={styles.userListName}
                  >{`${user.firstName} ${user.lastName}`}</AppText>
                  <Image
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 100,
                      borderWidth: 1,
                      borderColor: "black",
                    }}
                    source={{
                      uri: user.avatar,
                    }}
                  />
                </View>
              </TouchableOpacity>
            </View>
          ))
          .reverse()}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  userListContainer: {
    padding: 8,
    borderBottomWidth: 1,
    borderColor: appColors.accentGray,
    width: "100%",
  },
  userListItem: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userListName: {
    fontSize: 20,
  },
});

export default FavoritesScreen;
