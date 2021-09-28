import React, { useState } from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import AppText from "../components/layout/AppText";
import { AppButton } from "../components/layout/Native-components";
import { StarRating } from "../components/layout/Star";
import UserReviewsModal from "./UserReviews-modal";

const BusinessCard = ({ user, ...props }) => {
  const [viewModal, setViewModal] = useState(false);
  return (
    <View style={styles.card}>
      <View>
        <View style={styles.nameContainer}>
          <View>
            <AppText style={{ fontSize: 24 }}>{user.companyName}</AppText>
            <AppText style={styles.username}>{user.username}</AppText>
            <AppText style={{ color: "blue", fontSize: 20 }}>
              {user.location}
            </AppText>
            <AppText>{user.businessCategory}</AppText>
            <Image
              style={{
                width: 80,
                height: 80,
                borderRadius: 100,
                borderWidth: 2,
              }}
              source={{
                uri: user.avatar,
              }}
            />
            <StarRating rating={user.rating} />
          </View>
        </View>
        <View style={styles.descriptionContainer}>
          <AppText>{user.description}</AppText>
        </View>
      </View>
      <AppButton
        style={{ alignSelf: "center" }}
        title="Reviews"
        onPress={() => {
          setViewModal(true);
        }}
      />
      <UserReviewsModal
        visible={viewModal}
        onClose={() => {
          setViewModal(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 20,
    borderColor: "black",
    borderWidth: 1,
    alignItems: "stretch",
    justifyContent: "space-between",
    height: 600,
    padding: 24,
    marginTop: 8,
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  username: {
    color: "#1f7fbf",
  },
  descriptionContainer: {
    marginTop: 8,
  },
});
export default BusinessCard;
