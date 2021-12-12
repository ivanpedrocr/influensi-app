import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useColor } from "../../hooks/useColor";
import Ionicons from "../../styles/icons";

const Star = ({ marked, starId }) => {
  const { colors } = useColor();
  return (
    <Ionicons
      style={{ marginHorizontal: 0.6 }}
      name={marked ? "star" : "star-outline"}
      key={starId}
      color={colors.placeholderText}
      size={24}
    />
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

const StarButton = ({ onSelect, marked }) => {
  return (
    <TouchableOpacity onPress={onSelect}>
      <Star marked={marked} />
    </TouchableOpacity>
  );
};

export const StarPicker = ({ rating, onSelect }) => {
  return (
    <View style={{ flexDirection: "row" }}>
      {Array.from({ length: 5 }, (v, i) => (
        <StarButton marked={i <= rating - 1} onSelect={() => onSelect(i + 1)} />
      ))}
    </View>
  );
};
