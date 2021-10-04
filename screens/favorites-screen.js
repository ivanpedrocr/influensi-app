import { useFocusEffect } from "@react-navigation/core";
import React, { useEffect } from "react";
import { Text, View, Stylesheet, StyleSheet } from "react-native";
import { useState } from "react/cjs/react.development";
import { fetchFavoriteUsersList } from "../actions/favorite-user";
import AppText from "../components/layout/AppText";
import { appColors } from "../styles/app-styles";

const FavoritesScreen = ({ navigation, ...props }) => {
  const [favoritesList, setFavoritesList] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const getFavoritesList = async () => {
        const usersList = await fetchFavoriteUsersList();
        setFavoritesList(Object.values(usersList));
      };
      getFavoritesList();
    }, [])
  );
  return (
    <View style={styles.screen}>
      {favoritesList.map((user, i) => (
        <View key={i} style={styles.userListItem}>
          <AppText>{user.firstName} </AppText>
          <AppText>{user.lastName}</AppText>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  userListItem: {
    flexDirection: "row",
    padding: 8,
    borderBottomWidth: 1,
    borderColor: appColors.accentGray,
    width: "100%",
  },
});

export default FavoritesScreen;
