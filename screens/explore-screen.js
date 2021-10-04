import React, { useLayoutEffect, useMemo, useReducer, useState } from "react";
import {
  Text,
  View,
  Stylesheet,
  StyleSheet,
  PanResponder,
  Animated,
  Dimensions,
} from "react-native";
import UserCard from "../user/UserCard";
import { UserReducer, userInitialState } from "../user/UserProfile-reducer";
import { BusinessList, UserList } from "../dummy-data/UserList-dummy";
import {
  AppButton,
  AppIconButton,
} from "../components/layout/Native-components";
import BusinessCard from "../user/BusinessCard";
import { Ionicons } from "@expo/vector-icons";

const ExploreScreen = ({ navigation, ...props }) => {
  const SCREEN_WIDTH = Dimensions.get("window").width;
  const [accountType, setAccountType] = useState("USER");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showReview, setShowReview] = useState(true);
  const position = new Animated.ValueXY();
  const rotate = position.x.interpolate({
    inputRange: [(-SCREEN_WIDTH * 0.9) / 2, 0, (SCREEN_WIDTH * 0.9) / 2],
    outputRange: ["5deg", "0deg", "-5deg"],
    extrapolate: "clamp",
  });
  const Pan = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onPanResponderMove: (evt, gestureState) => {
      position.setValue({ x: gestureState.dx, y: gestureState.dy });
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dx > 120) {
        Animated.spring(position, {
          useNativeDriver: true,
          toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy },
          speed: 240,
        }).start(() => {
          setCurrentIndex(currentIndex + 1);
        });
      } else if (gestureState.dx < -120) {
        Animated.spring(position, {
          useNativeDriver: true,
          toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy },
          speed: 240,
        }).start(() => {
          setCurrentIndex(currentIndex + 1);
        });
      } else {
        Animated.spring(position, {
          useNativeDriver: true,
          toValue: { x: 0, y: 0 },
        }).start();
      }
    },
  });
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
              <Animated.View
                {...Pan.panHandlers}
                key={i}
                style={{
                  transform: [
                    { rotate: rotate },
                    ...position.getTranslateTransform(),
                  ],
                  width: "95%",
                  height: "90%",
                  position: "absolute",
                }}
              >
                {accountType === "USER" ? (
                  <UserCard user={user} showReview={showReview} />
                ) : (
                  <BusinessCard user={user} />
                )}
              </Animated.View>
            );
          } else {
            return (
              <Animated.View
                key={user.username}
                style={{
                  width: "95%",
                  height: "90%",
                  position: "absolute",
                }}
              >
                {accountType === "USER" ? (
                  <UserCard user={user} />
                ) : (
                  <BusinessCard user={user} />
                )}
              </Animated.View>
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
