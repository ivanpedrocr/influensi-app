import React, { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
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
            >{`${user.first_name} ${user.last_name}`}</AppText>
            <AppText style={styles.username}>{user.username}</AppText>
            <AppText>{user.age}</AppText>
            {user?.followers && (
              <AppText style={{ fontWeight: "bold" }}>
                {user?.followers}k
              </AppText>
            )}
            <AppText style={{ color: "green" }}>
              +{user?.averageReturn}%
            </AppText>
            <StarRating rating={user?.rating} />
          </View>
        </View>
        {user?.avatar && (
          <Image
            style={{
              width: 100,
              height: 100,
              borderRadius: 100,
              borderWidth: 2,
            }}
            source={{
              uri: user?.avatar,
            }}
          />
        )}
        <View style={styles.descriptionContainer}>
          <AppText>{user?.description}</AppText>
        </View>
      </View>
      {
        <AppButton
          style={{ alignSelf: "center" }}
          title="Reviews"
          onPress={() => {
            setViewModal(true);
          }}
        />
      }
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
    flex: 1,
    padding: 24,
    marginTop: 8,
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
