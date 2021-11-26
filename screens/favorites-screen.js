import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, Image, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useState } from "react/cjs/react.development";
import createConversation from "../actions/create-conversation";
// import createConversation from "../actions/create-conversation";
import {
  deleteFavoriteUser,
  fetchFavoriteUsersList,
} from "../actions/favorite-user";
import { useAuthContext } from "../auth/auth-context";
import FavoritesUserModal from "../components/favorites/FavoritesUserModal";
import AppText from "../components/layout/AppText";
import MenuItemTouchable from "../components/layout/MenuItemTouchable";
import { AppScreen } from "../components/layout/Native-components";
import SplashScreen from "./splash-screen";

const FavoritesScreen = ({ navigation, ...props }) => {
  const [favoritesList, setFavoritesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [authValues, authDispatch] = useAuthContext();
  const [modalVisible, setModalVisible] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const getFavoritesList = async () => {
        setIsLoading(true);
        const usersList = await fetchFavoriteUsersList(authValues);
        if (usersList && usersList.length !== 0) {
          setFavoritesList(Object.values(usersList));
        }
        setIsLoading(false);
      };
      getFavoritesList();
    }, [])
  );
  const deleteUser = async () => {
    await deleteFavoriteUser(user.id, authValues);
    favoritesList.splice(i, 1);
  };

  if (isLoading && favoritesList.length === 0) {
    return <SplashScreen />;
  }
  return (
    <AppScreen>
      <ScrollView>
        {favoritesList.length === 0 ? (
          <AppText style={{ alignSelf: "center" }}>No Favorites Found.</AppText>
        ) : (
          favoritesList
            .map((user, i) => (
              <MenuItemTouchable
                key={i}
                onPress={() => setModalVisible({ i, true: true })}
                style={styles.listItem}
              >
                <FavoritesUserModal
                  user={user}
                  isVisible={modalVisible.i === i && modalVisible.true === true}
                  closeModal={() => setModalVisible(false)}
                  onDelete={deleteUser}
                  sendMessage={async () => {
                    setModalVisible(false);
                    const chatId = await createConversation(
                      user.id,
                      authValues
                    );
                    navigation.navigate("Messages", {
                      screen: "MESSAGES",
                      params: { chatId },
                    });
                  }}
                />
                <AppText
                  style={styles.userListName}
                >{`${user.first_name} ${user.last_name}`}</AppText>
                <Image
                  style={styles.userImage}
                  source={{
                    uri: user.avatar,
                  }}
                />
              </MenuItemTouchable>
            ))
            .reverse()
        )}
      </ScrollView>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  listItem: {
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  userListName: {
    fontSize: 20,
  },
  userImage: {
    minWidth: 44,
    minHeight: 44,
    borderRadius: 100,
  },
});

export default FavoritesScreen;
