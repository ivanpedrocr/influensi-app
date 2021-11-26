import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import AppText from "../components/layout/AppText";
import { AppButton } from "../components/layout/Native-components";
import { StarRating } from "../components/layout/Star";
import Modal from "react-native-modal";

const UserReviewsModal = ({ visible, onClose, ...props }) => {
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
    <Modal isVisible={visible} style={{ margin: 0 }} backdropOpacity={0}>
      <View style={styles.card}>
        <ScrollView>
          <View style={{ paddingVertical: 8 }} />
          {reviews.map((review, i) => {
            return (
              <View key={i} style={{ paddingVertical: 8 }}>
                <View style={{ flexDirection: "row" }}>
                  <Image
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
        <View style={{ marginTop: "auto", marginBottom: 16 }}>
          <AppButton title="Close" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    height: "65%",
    borderRadius: 20,
    alignItems: "flex-start",
    shadowColor: "black",
    shadowOffset: { height: -3 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    alignSelf: "center",
    marginTop: "auto",
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
});
export default UserReviewsModal;
