import React, { useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import AppText from "../components/layout/AppText";

import { StarRating } from "../components/layout/Star";
import Image from "../components/layout/AppImage";

const BusinessProfile = ({ ...props }) => {
  const user = {
    username: "infleunsi",
    companyName: "Influensi",
    description: "Connecting businesses to influencers around the world.",
    rating: 5,
    location: "Miami",
    businessCategory: "Marketing App",
    avatar: "https://robohash.org/atqueatvopplko.png?size=300x300&set=set1",
  };
  return (
    <View>
      <View>
        <View style={styles.nameContainer}>
          <View>
            <Image
              style={{
                width: 150,
                height: 150,
                borderRadius: 100,
                borderWidth: 2,
              }}
              source={{
                uri: user.avatar,
              }}
            />
            <AppText style={{ fontSize: 32, fontWeight: "bold" }}>
              {user.companyName}
            </AppText>
            <AppText style={{ color: "blue", fontSize: 24 }}>
              {user.location}
            </AppText>
            <AppText>{user.businessCategory}</AppText>

            <StarRating rating={user.rating} />
          </View>
        </View>
        <View style={styles.descriptionContainer}>
          <AppText>{user.description}</AppText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24,
  },
  username: {
    color: "#1f7fbf",
  },
  descriptionContainer: {
    marginTop: 8,
    paddingHorizontal: 24,
  },
});
export default BusinessProfile;
