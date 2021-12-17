import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useState } from "react/cjs/react.development";
import createConversation from "../actions/create-conversation";
import {
  deleteFavoriteUser,
  fetchFavoriteUsersList,
} from "../actions/favorite-user";
import { useAuthContext } from "../auth/auth-context";
import FavoritesUserModal from "../components/favorites/FavoritesUserModal";
import AppText from "../components/layout/AppText";
import MenuItemTouchable from "../components/layout/MenuItemTouchable";
import { AppScreen } from "../components/layout/Native-components";
import WriteReviewModal from "../components/reviews/WriteReviewModal";
import SplashScreen from "./splash-screen";
import Image from "../components/layout/AppImage";

const FavoritesScreen = ({ navigation, ...props }) => {
  const [favoritesList, setFavoritesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [authValues, authDispatch] = useAuthContext();
  const [modalVisible, setModalVisible] = useState({
    open: false,
    user: {},
    closing: false,
  });
  const [showReviewTextBox, setShowReviewTextBox] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const getFavoritesList = async () => {
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

  const sendMessage = async (user) => {
    setModalVisible(false);
    const chatId = await createConversation(user.id, authValues);
    navigation.navigate("Messages", {
      screen: "MESSAGES",
      params: { chatId },
    });
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
                activeOpacity={0.2}
                key={i}
                onPress={() => setModalVisible({ open: true, user })}
                style={styles.listItem}
              >
                <Image
                  style={styles.userImage}
                  source={{
                    uri: user.avatar,
                  }}
                />
                <AppText style={styles.userListName}>
                  {user.first_name} {user.last_name}
                </AppText>
              </MenuItemTouchable>
            ))
            .reverse()
        )}
        <FavoritesUserModal
          user={modalVisible?.user}
          isVisible={modalVisible.open && !modalVisible.closing}
          closeModal={() =>
            setModalVisible((prev) => ({ ...prev, closing: true }))
          }
          onDelete={deleteUser}
          sendMessage={sendMessage}
          showReviewTextBox={() => setShowReviewTextBox(true)}
          onModalHide={() => {
            setModalVisible((prev) => ({ ...prev, open: false }));
          }}
        />
        <WriteReviewModal
          setShowReviewTextBox={setShowReviewTextBox}
          user={{ ...authValues.user, id: authValues.userId }}
          reviewedUser={modalVisible?.user?.id}
          isVisible={showReviewTextBox && !modalVisible.open}
        />
      </ScrollView>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  listItem: {
    justifyContent: "space-between",
  },
  userListName: {
    fontSize: 20,
    fontWeight: "600",
  },
  userImage: {
    minWidth: 44,
    minHeight: 44,
    borderRadius: 100,
  },
});

export default FavoritesScreen;
