import React, { useLayoutEffect, useMemo, useReducer, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import UserCard from "../user/UserCard";
import {
  AppIconButton,
  AppScreen,
} from "../components/layout/Native-components";
import BusinessCard from "../user/BusinessCard";
import { Ionicons } from "@expo/vector-icons";
import { favoriteUser } from "../actions/favorite-user";
import DeckSwipeAnimate from "../components/layout/DeckSwipeAnimate";
import { useAuthContext } from "../auth/auth-context";
import { useFocusEffect } from "@react-navigation/native";
import fetchExploreUserList from "../actions/fetch-explore-user-list";
import AppText from "../components/layout/AppText";
import { useColor } from "../hooks/useColor";
import { useHeaderButton } from "../hooks/useHeaderButton";

const ExploreScreen = ({ navigation, ...props }) => {
  const SCREEN_WIDTH = Dimensions.get("window").width;
  const [accountType, setAccountType] = useState("USER");
  const [userList, setUserList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showReview, setShowReview] = useState(true);
  const [authValues, authDispatch] = useAuthContext();
  const [loading, setLoading] = useState(false);
  const { colors, dark } = useColor();

  const onSwipeRight = async (currentUser) => {
    await favoriteUser(currentUser, authValues);
    setCurrentIndex(currentIndex + 1);
  };
  const onSwipeLeft = () => {
    setCurrentIndex(currentIndex + 1);
  };

  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        setLoading(true);
        const users = await fetchExploreUserList(authValues);
        if (users) {
          setUserList(users);
        }
        setLoading(false);
      })();
    }, [])
  );

  useHeaderButton({
    headerRight: () => (
      <AppIconButton
        style={{ marginRight: 8 }}
        onPress={() => {
          setAccountType(accountType === "USER" ? "BUSINESS" : "USER");
        }}
      >
        <Ionicons name="log-out-outline" color={colors.text} size={28} />
      </AppIconButton>
    ),
  });
  return (
    <AppScreen style={{ alignItems: "center" }}>
      {currentIndex + 1 > userList.length && !loading ? (
        <AppText>{"No More Users Found :("}</AppText>
      ) : (
        userList
          .map((user, i) => {
            if (i < currentIndex) {
              return null;
            }
            if (i === currentIndex || i === currentIndex + 1) {
              return (
                <DeckSwipeAnimate
                  key={i}
                  onSwipeLeft={onSwipeLeft}
                  onSwipeRight={() => onSwipeRight(user)}
                  style={styles.frontCard}
                  SCREEN_WIDTH={SCREEN_WIDTH}
                >
                  {accountType === "USER" ? (
                    <UserCard user={user} showReview={showReview} />
                  ) : (
                    <BusinessCard user={user} />
                  )}
                </DeckSwipeAnimate>
              );
            } else {
              return (
                <DeckSwipeAnimate
                  key={i}
                  pan={false}
                  style={styles.backCard}
                  onSwipeLeft={onSwipeLeft}
                  onSwipeRight={() => onSwipeRight(user)}
                  SCREEN_WIDTH={SCREEN_WIDTH}
                >
                  {accountType === "USER" ? (
                    <UserCard user={user} />
                  ) : (
                    <BusinessCard user={user} />
                  )}
                </DeckSwipeAnimate>
              );
            }
          })
          .reverse()
      )}
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  frontCard: {
    shadowOpacity: 0.3,
    shadowColor: "black",
    shadowOffset: { width: -0.5, height: 0.1 },
    width: "95%",
    height: "95%",
    position: "absolute",
  },
  backCard: {
    position: "absolute",
  },
});

export default ExploreScreen;
