import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import FastImage from "react-native-fast-image";
import { TouchableOpacity } from "react-native-gesture-handler";
import ReactNativeModal from "react-native-modal";
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
import {
  AppButton,
  AppScreen,
  AppTextInput,
} from "../components/layout/Native-components";
import TextBox from "../components/layout/TextBox";
import SplashScreen from "./splash-screen";

const FavoritesScreen = ({ navigation, ...props }) => {
  const [favoritesList, setFavoritesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [authValues, authDispatch] = useAuthContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [showReviewTextBox, setShowReviewTextBox] = useState(false);

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

  const sendMessage = async (user) => {
    setModalVisible(false);
    const chatId = await createConversation(user.id, authValues);
    navigation.navigate("Messages", {
      screen: "MESSAGES",
      params: { chatId },
    });
  };

  const writeReview = async (user) => {};

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
                onPress={() =>
                  setModalVisible({ i, true: true, closed: false })
                }
                style={styles.listItem}
              >
                <FastImage
                  style={styles.userImage}
                  source={{
                    uri: user.avatar,
                  }}
                />
                <FavoritesUserModal
                  user={user}
                  isVisible={modalVisible.i === i && modalVisible.true === true}
                  closeModal={() => setModalVisible(false)}
                  onDelete={deleteUser}
                  sendMessage={sendMessage}
                  showReviewTextBox={() =>
                    setShowReviewTextBox({ closed: false, closing: false })
                  }
                  onModalHide={() => {
                    setModalVisible({ closed: true });
                  }}
                />
                <AppText style={styles.userListName}>
                  {user.first_name} {user.last_name}
                </AppText>
              </MenuItemTouchable>
            ))
            .reverse()
        )}
        <ReactNativeModal
          isVisible={showReviewTextBox && modalVisible?.closed}
          onBackdropPress={() => setShowReviewTextBox(false)}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          hasBackdrop={true}
          backdropOpacity={0.3}
        >
          <View style={{ alignItems: "center" }}>
            <TextBox />
            <AppButton title="Send" />
          </View>
        </ReactNativeModal>
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
  },
  userImage: {
    minWidth: 44,
    minHeight: 44,
    borderRadius: 100,
  },
});

export default FavoritesScreen;
