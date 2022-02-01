import React, { useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import AppText from "../components/layout/AppText";
import { AppButton } from "../components/layout/Native-components";
import { StarRating } from "../components/layout/Star";
import UserReviewsModal from "./UserReviews-modal";
import Image from "../components/layout/AppImage";
import { useColor } from "../hooks/useColor";

const BusinessCard = ({ user, ...props }) => {
  const [viewModal, setViewModal] = useState(false);
  const { colors } = useColor();
  return (
    <View style={styles(colors).card}>
      <View>
        <View style={styles(colors).nameContainer}>
          <View>
            <AppText style={{ fontSize: 24 }}>{user.name}</AppText>
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
        <View style={styles(colors).descriptionContainer}>
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
        user={user}
      />
    </View>
  );
};

const styles = (colors) =>
  StyleSheet.create({
    card: {
      borderRadius: 32,
      alignItems: "stretch",
      justifyContent: "space-between",
      flex: 1,
      padding: 24,
      marginTop: 16,
      backgroundColor: colors.background,
    },
    nameContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    username: {},
    descriptionContainer: {
      marginTop: 8,
    },
  });
export default BusinessCard;
