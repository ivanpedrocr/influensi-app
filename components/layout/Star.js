import React from "react";
import { Text, View } from "react-native";

const Star = ({ marked, starId }) => {
  return (
    <Text data-star-id={starId} style={{ color: "#ffca6e", fontSize: 20 }}>
      {marked ? "\u2605" : "\u2606"}
    </Text>
  );
};

export const StarRating = ({ rating }) => {
  return (
    <View style={{ flexDirection: "row" }}>
      {Array.from({ length: 5 }, (v, i) => (
        <Star starId={i + 1} key={`star_${i + 1}`} marked={rating >= i + 1} />
      ))}
    </View>
  );
};
