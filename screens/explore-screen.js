import React, { useLayoutEffect, useMemo, useReducer, useState } from "react";
import {
  View,
  StyleSheet,
  PanResponder,
  Animated,
  Dimensions,
} from "react-native";
import UserCard from "../user/UserCard";
import { BusinessList, UserList } from "../dummy-data/UserList-dummy";
import {
  AppButton,
  AppIconButton,
} from "../components/layout/Native-components";
import BusinessCard from "../user/BusinessCard";
import { Ionicons } from "@expo/vector-icons";
import { favoriteUser } from "../actions/favorite-user";
import DeckSwipeAnimate from "../components/layout/DeckSwipeAnimate";

const ExploreScreen = ({ navigation, ...props }) => {
  const SCREEN_WIDTH = Dimensions.get("window").width;
  const [accountType, setAccountType] = useState("USER");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showReview, setShowReview] = useState(true);

  const onSwipeRight = () => {
    favoriteUser(dummyList[currentIndex]);
    setCurrentIndex(currentIndex + 1);
  };
  const onSwipeLeft = () => {
    setCurrentIndex(currentIndex + 1);
  };
  const dummyList = useMemo(
    () => (accountType === "USER" ? UserList : BusinessList),
    [accountType]
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <AppIconButton
          style={{ marginRight: 8 }}
          onPress={() => {
            setAccountType(accountType === "USER" ? "BUSINESS" : "USER");
          }}
        >
          <Ionicons name="log-out-outline" size={28} />
        </AppIconButton>
      ),
    });
  }, [navigation, accountType]);
  return (
    <View style={styles.screen}>
      {dummyList
        .map((user, i) => {
          if (i < currentIndex) {
            return null;
          } else if (i === currentIndex) {
            return (
              <DeckSwipeAnimate
                key={i}
                onSwipeLeft={onSwipeLeft}
                onSwipeRight={onSwipeRight}
                style={{
                  width: "95%",
                  height: "90%",
                  position: "absolute",
                }}
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
                style={{
                  width: "95%",
                  height: "90%",
                  position: "absolute",
                }}
                onSwipeLeft={onSwipeLeft}
                onSwipeRight={onSwipeRight}
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
        .reverse()}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
});

export default ExploreScreen;
