import React from "react";
import { StyleSheet, TouchableHighlight, View } from "react-native";
import AppText from "../components/layout/AppText";
import { StarRating } from "../components/layout/Star";
import { useAuthContext } from "../auth/auth-context";
import ImageSelector from "../components/layout/ImageSelector";
import { differenceInYears } from "date-fns";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";

const UserProfile = ({ user = {}, setProfileImageUri, imageUri }) => {
  const [authValues, authDispatch] = useAuthContext();
  const name =
    user.business_name || `${user.first_name} ${user.last_name}` || null;
  return (
    <View>
      <View style={styles.nameContainer}>
        <View>
          <ImageSelector
            profileImageUri={imageUri}
            setProfileImageUri={(uri) => setProfileImageUri(uri)}
          />
          <AppText style={{ fontSize: 32, fontWeight: "bold" }}>{name}</AppText>
          <AppText style={styles.username}>{user.username}</AppText>
          {user.age && (
            <AppText>
              {differenceInYears(new Date(), new Date(user.age))}
            </AppText>
          )}
          {user.followers && (
            <AppText style={{ fontWeight: "bold" }}>{user.followers}</AppText>
          )}
          {user.averageReturn && (
            <AppText style={{ color: "green" }}>{user.averageReturn}</AppText>
          )}
          <StarRating rating={user.rating} />
        </View>
      </View>
      <View style={{ paddingHorizontal: 24 }}></View>
      <View style={styles.descriptionContainer}>
        <AppText>{user?.description}</AppText>
      </View>
      {user.categories &&
        Object.keys(user.categories).map((category) => {
          return (
            <AppText key={category}>
              {capitalizeFirstLetter(category.toLowerCase())}
            </AppText>
          );
        })}
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
  username: {},
  descriptionContainer: {
    width: "100%",
    marginTop: 8,
    paddingHorizontal: 24,
  },
});
export default UserProfile;
