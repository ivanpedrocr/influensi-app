import React from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import AppText from "../components/layout/AppText";
import { AppButton } from "../components/layout/Native-components";
import { StarRating } from "../components/layout/Star";
import { ReactNativeModal } from "react-native-modal";
import { useColor } from "../hooks/useColor";
import { fetchUserReviews } from "../actions/fetch-user-reviews";
import { useState } from "react/cjs/react.development";
import Image from "../components/layout/AppImage";

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
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image
                      style={{ width: 36, height: 36, borderRadius: 100 }}
                      source={{
                        uri: review?.reviewer?.avatar,
                      }}
                    />
                    <AppText
                      style={{ fontWeight: "600", fontSize: 18, marginLeft: 4 }}
                    >
                      {review.reviewer.first_name} {review.reviewer.last_name}
                    </AppText>
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
