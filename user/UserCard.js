import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import FastImage from "react-native-fast-image";
import AppText from "../components/layout/AppText";
import { AppButton } from "../components/layout/Native-components";
import { StarRating } from "../components/layout/Star";
import { useColor } from "../hooks/useColor";
import UserReviewsModal from "./UserReviews-modal";

const UserCard = ({ user, ...props }) => {
  const [viewModal, setViewModal] = useState(false);
  const { colors } = useColor();
  return (
    <View style={{ ...styles.card, backgroundColor: colors.background }}>
      <View>
        <View style={styles.nameContainer}>
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <AppText style={{ fontSize: 24 }}>
                {user.first_name} {user.last_name}
              </AppText>
            </View>
            <AppText style={{ fontSize: 20 }}>{user.age}</AppText>
            <AppText style={{ ...styles.username, color: colors.primary }}>
              {user.username}
            </AppText>
            <StarRating rating={user?.rating} />
          </View>
        </View>
        {user?.avatar && (
          <FastImage
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
        user={user}
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
    borderRadius: 32,
    alignItems: "stretch",
    justifyContent: "space-between",
    flex: 1,
    padding: 24,
    marginTop: 16,
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
export default UserCard;
