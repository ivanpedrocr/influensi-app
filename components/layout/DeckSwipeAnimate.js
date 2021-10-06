import React from "react";
import {
  Text,
  View,
  Stylesheet,
  StyleSheet,
  PanResponder,
  Animated,
  Dimensions,
} from "react-native";

const DeckSwipeAnimate = ({
  children,
  pan = true,
  style,
  onSwipeRight,
  onSwipeLeft,
  SCREEN_WIDTH,
  ...props
}) => {
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
          onSwipeRight();
        });
      } else if (gestureState.dx < -120) {
        Animated.spring(position, {
          useNativeDriver: true,
          toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy },
          speed: 240,
        }).start(() => {
          onSwipeLeft();
        });
      } else {
        Animated.spring(position, {
          useNativeDriver: true,
          toValue: { x: 0, y: 0 },
        }).start();
      }
    },
  });
  return pan ? (
    <Animated.View
      {...Pan.panHandlers}
      style={{
        transform: [{ rotate: rotate }, ...position.getTranslateTransform()],
        ...style,
      }}
    >
      {children}
    </Animated.View>
  ) : (
    <Animated.View
      style={{
        transform: [{ rotate: rotate }, ...position.getTranslateTransform()],
        ...style,
      }}
    >
      {children}
    </Animated.View>
  );
};

export default DeckSwipeAnimate;
