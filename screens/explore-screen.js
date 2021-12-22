import React, { useLayoutEffect, useMemo, useReducer, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import UserCard from "../user/UserCard";
import { AppScreen } from "../components/layout/Native-components";
import BusinessCard from "../user/BusinessCard";
import { favoriteUser } from "../actions/favorite-user";
import DeckSwipeAnimate from "../components/layout/DeckSwipeAnimate";
import { useAuthContext } from "../auth/auth-context";
import { useFocusEffect } from "@react-navigation/native";
import fetchExploreUserList from "../actions/fetch-explore-user-list";
import AppText from "../components/layout/AppText";
import { useColor } from "../hooks/useColor";

const ExploreScreen = ({ navigation, ...props }) => {
  const [authValues, authDispatch] = useAuthContext();
  const [userList, setUserList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showReview, setShowReview] = useState(true);
  const [loading, setLoading] = useState(false);
  const { colors, dark } = useColor();
  const SCREEN_WIDTH = Dimensions.get("window").width;

  const onSwipeRight = async (currentUser) => {
    setCurrentIndex(currentIndex + 1);
    await favoriteUser(currentUser, authValues);
  };
  const onSwipeLeft = () => {
    setCurrentIndex(currentIndex + 1);
  };

  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        const users = await fetchExploreUserList(authValues);
        if (users) {
          setUserList(users);
        }
      })();
    }, [])
  );
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
                  {authValues.user.user_type === "INFLUENCER" ? (
                    <BusinessCard user={user} />
                  ) : (
                    <UserCard user={user} showReview={showReview} />
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
                  {authValues.user.user_type === "INFLUENCER" ? (
                    <BusinessCard user={user} />
                  ) : (
                    <UserCard user={user} showReview={showReview} />
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
