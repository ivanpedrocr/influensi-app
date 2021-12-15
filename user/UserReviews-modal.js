import React from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import AppText from "../components/layout/AppText";
import { AppButton } from "../components/layout/Native-components";
import { StarRating } from "../components/layout/Star";
import { ReactNativeModal } from "react-native-modal";
import FastImage from "react-native-fast-image";
import { useColor } from "../hooks/useColor";
import { fetchUserReviews } from "../actions/fetch-user-reviews";
import { useState } from "react/cjs/react.development";

const UserReviewsModal = ({ visible, onClose, user }) => {
  const { colors } = useColor();
  const [userReviews, setUserReviews] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const getReviews = async () => {
    if (!userReviews.length && !loaded) {
      const reviews = await fetchUserReviews(user.id);
      setUserReviews(reviews);
      setLoaded(true);
    }
  };

  return (
    <ReactNativeModal
      isVisible={visible}
      style={{ margin: 0 }}
      backdropOpacity={0}
      onBackdropPress={onClose}
      onModalShow={getReviews}
    >
      <View style={styles(colors).card}>
        {!userReviews.length && loaded ? (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <AppText>No Reviews Found.</AppText>
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles().reviewsList}>
            <View style={{ paddingVertical: 8 }} />
            {userReviews.map((review, i) => {
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
        )}
        <AppButton
          title="Close"
          onPress={onClose}
          style={{ alignSelf: "flex-end", margin: 16 }}
        />
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
      width: "100%",
    },
    reviewsList: {
      width: "100%",
      paddingHorizontal: 16,
    },
  });
export default UserReviewsModal;
