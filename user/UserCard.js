import React, { useState } from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import AppText from "../components/layout/AppText";
import { AppButton } from "../components/layout/Native-components";
import { StarRating } from "../components/layout/Star";
import UserReviewsModal from "./UserReviews-modal";

const UserCard = ({ user, ...props }) => {
  const [viewModal, setViewModal] = useState(false);
  return (
    <View style={styles.card}>
      <View>
        <View style={styles.nameContainer}>
          <View>
            <AppText
              style={{ fontSize: 24 }}
            >{`${user.firstName} ${user.lastName}`}</AppText>
            <AppText style={styles.username}>{user.username}</AppText>
            <AppText>{user.age}</AppText>
            <AppText style={{ fontWeight: "bold" }}>{user.followers}k</AppText>
            <AppText style={{ color: "green" }}>+{user.averageReturn}%</AppText>
            <StarRating rating={user.rating} />
          </View>
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
        </View>
        <View style={styles.descriptionContainer}>
          <AppText>{user.description}</AppText>
        </View>
      </View>
      {props.showReview && (
        <AppButton
          style={{ alignSelf: "center" }}
          title="Reviews"
          onPress={() => {
            setViewModal(true);
          }}
        />
      )}
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
    alignItems: "stretch",
    justifyContent: "space-between",
    height: 600,
    padding: 24,
    marginTop: 8,
    shadowColor: "black",
    shadowOffset: { height: 1 },
    shadowRadius: 3,
    shadowOpacity: 0.01,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  username: {
    color: "#1f7fbf",
  },
  descriptionContainer: {
    marginTop: 8,
  },
});
export default UserCard;
