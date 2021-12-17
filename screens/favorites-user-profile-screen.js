import React from "react";
import { StyleSheet, View } from "react-native";
import AppText from "../components/layout/AppText";
import { AppScreen } from "../components/layout/Native-components";
import { StarRating } from "../components/layout/Star";
import Image from "../components/layout/AppImage";

const FavoritesUserProfileScreen = ({ route, navigation }) => {
  const { user } = route.params;
  return (
    <AppScreen>
      <View>
        <View style={styles.nameContainer}>
          <View>
            <Image
              style={{
                width: 150,
                height: 150,
                borderWidth: 2,
                borderColor: "black",
                borderRadius: 100,
              }}
              source={{
                uri: user.avatar,
              }}
            />
            <AppText style={{ fontSize: 32, fontWeight: "bold" }}>
              {user.first_name} {user.last_name}
            </AppText>
            <AppText style={styles.username}>{user.username}</AppText>
            <AppText>{user.age}</AppText>
            <AppText style={{ fontWeight: "bold" }}>{user?.followers}</AppText>
            <AppText style={{ color: "green" }}>{user?.averageReturn}</AppText>
            <StarRating rating={user?.rating} />
          </View>
        </View>
        <View style={{ paddingHorizontal: 24 }}></View>
        <View style={styles.descriptionContainer}>
          <AppText>{user?.description}</AppText>
        </View>
      </View>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
  },
  username: {},
  descriptionContainer: {
    width: "100%",
    marginTop: 8,
    paddingHorizontal: 24,
  },
});

export default FavoritesUserProfileScreen;
