import React, { useReducer, useState } from "react";
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
import { AppButton } from "../components/layout/Native-components";
import BusinessCard from "../user/BusinessCard";

const ExploreScreen = (props) => {
  const SCREEN_WIDTH = Dimensions.get("window").width;
  const [dummyList, setDummyList] = useState(UserList);
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
      setShowReview(false);
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dx > 120) {
        Animated.spring(position, {
          useNativeDriver: true,
          toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy },
        }).start(() => {
          position.setValue({ x: 0, y: 0 });
          setCurrentIndex((prev) => prev + 1);
          setShowReview(true);
        });
      } else if (gestureState.dx < -120) {
        Animated.spring(position, {
          useNativeDriver: true,
          toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy },
        }).start(() => {
          position.setValue({ x: 0, y: 0 });
          setCurrentIndex((prev) => prev + 1);
          setShowReview(true);
        });
      } else {
        Animated.spring(position, {
          useNativeDriver: true,
          toValue: { x: 0, y: 0 },
        }).start(() => {
          setShowReview(true);
        });
      }
    },
  });
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
                  width: "90%",
                  height: "80%",
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
                  width: "90%",
                  height: 500,
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
      <View style={{ marginTop: "auto", alignSelf: "flex-end" }}>
        <AppButton
          title="Switch Accounts"
          style={{ width: 200 }}
          onPress={() => {
            setDummyList(accountType === "USER" ? BusinessList : UserList);
            setAccountType(accountType === "USER" ? "BUSINESS" : "USER");
          }}
        />
      </View>
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
