import React, { useReducer } from "react";
import { Image, StyleSheet, View } from "react-native";
import AppText from "../components/layout/AppText";
import { StarRating } from "../components/layout/Star";

const UserProfile = ({ user, ...props }) => {
  return (
    <View style={{ width: "100%" }}>
      <View style={styles.nameContainer}>
        <View>
          <Image
            style={{
              width: 150,
              height: 150,
              borderRadius: 100,
              borderWidth: 2,
              borderColor: "black",
            }}
            source={{
              uri: "https://robohash.org/sedepatut.png?size=300x300&set=set1",
            }}
          />
          <AppText
            style={{ fontSize: 32, fontWeight: "bold" }}
          >{`${user.firstName} ${user.lastName}`}</AppText>
          <AppText style={styles.username}>{user.username}</AppText>
          <AppText>{user.age}</AppText>
          <AppText style={{ fontWeight: "bold" }}>{user.followers}k</AppText>
          <AppText style={{ color: "green" }}>+{user.averageReturn}%</AppText>
          <StarRating rating={user.rating} />
        </View>
      </View>
      <View style={{ paddingHorizontal: 24 }}></View>
      <View style={styles.descriptionContainer}>
        <AppText>{user.description}</AppText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
  },
  username: {
    color: "#1f7fbf",
  },
  descriptionContainer: {
    width: "100%",
    marginTop: 8,
    paddingHorizontal: 24,
  },
});
export default UserProfile;
