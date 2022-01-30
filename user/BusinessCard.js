import React, { useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import AppText from "../components/layout/AppText";
import { AppButton } from "../components/layout/Native-components";
import { StarRating } from "../components/layout/Star";
import { appStyles } from "../styles/app-styles";
import UserReviewsModal from "./UserReviews-modal";
import Image from "../components/layout/AppImage";

const BusinessCard = ({ user, ...props }) => {
  const [viewModal, setViewModal] = useState(false);
  return (
    <View style={appStyles.card}>
      <View>
        <View style={styles.nameContainer}>
          <View>
            <AppText style={{ fontSize: 24 }}>{user.companyName}</AppText>
            <AppText style={{ color: "blue", fontSize: 20 }}>
              {user.location}
            </AppText>
            <AppText>{user.businessCategory}</AppText>
            <Image
              style={{
                width: 100,
                height: 100,
                borderRadius: 100,
                borderWidth: 2,
              }}
              source={{
                uri: user.avatar || null,
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
