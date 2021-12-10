import React from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import AppText from "../components/layout/AppText";
import {
  AppButton,
  AppTextInput,
} from "../components/layout/Native-components";
import { StarRating } from "../components/layout/Star";
import Modal, { ReactNativeModal } from "react-native-modal";
import FastImage from "react-native-fast-image";
import { useColor } from "../hooks/useColor";

const UserReviewsModal = ({ visible, onClose, ...props }) => {
  const { colors } = useColor();
  const reviews = [
    { name: "John Doe", rating: 5, review: "Great worker. Highly recommend." },
    ...[
      {
        name: "Juliana Webley",
        rating: 5,
        review: "Sed ante. Vivamus tortor.",
      },
      {
        name: "Kameko Crossland",
        rating: 2,
        review: "Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.",
      },
      {
        name: "Frazer Bartelet",
        rating: 4,
        review: "Etiam justo.",
      },
    ],
  ];
  return (
    <ReactNativeModal
      isVisible={visible}
      style={{ margin: 0 }}
      backdropOpacity={0}
      onBackdropPress={onClose}
    >
      <View style={styles(colors).card}>
        <ScrollView contentContainerStyle={styles().reviewsList}>
          <View style={{ paddingVertical: 8 }} />
          {reviews.map((review, i) => {
            return (
              <View key={i} style={{ paddingVertical: 8 }}>
                <View style={{ flexDirection: "row" }}>
                  <FastImage
                    style={{ width: 24, height: 24 }}
                    source={{
                      uri: "https://i.pinimg.com/474x/9b/47/a0/9b47a023caf29f113237d61170f34ad9.jpg",
                    }}
                  />
                  <AppText>{review.name}</AppText>
                </View>
                <StarRating rating={review.rating} />
                <AppText>{review.review}</AppText>
              </View>
            );
          })}
        </ScrollView>
        <AppButton title="Close" onPress={onClose} />
      </View>
    </ReactNativeModal>
  );
};

const styles = (colors) =>
  StyleSheet.create({
    card: {
      height: "65%",
      shadowColor: "black",
      shadowOffset: { height: -3 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      alignSelf: "center",
      marginTop: "auto",
      paddingBottom: 32,
      backgroundColor: colors?.background,
      borderRadius: 16,
    },
    reviewsList: {
      width: "100%",
      paddingHorizontal: 16,
    },
  });
export default UserReviewsModal;
