import React from "react";
import { StyleSheet, TouchableHighlight, View } from "react-native";
import AppText from "../components/layout/AppText";
import { StarRating } from "../components/layout/Star";
import {
  launchImageLibraryAsync,
  requestMediaLibraryPermissionsAsync,
} from "expo-image-picker";
import { uploadImage } from "../actions/upload-image";
import { useAuthContext } from "../auth/auth-context";
import FastImage from "react-native-fast-image";

const UserProfile = ({ user, setProfileImageUri, imageUri }) => {
  const [authValues, authDispatch] = useAuthContext();
  const handleImagePicked = async (pickerResult) => {
    try {
      if (!pickerResult.cancelled) {
        const uploadUrl = await uploadImage(pickerResult.uri, authValues);
        setProfileImageUri(uploadUrl);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const pickImage = async () => {
    const { status } = await requestMediaLibraryPermissionsAsync();
    if (status === "granted") {
      const pickerResult = await launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [3, 3],
      });
      handleImagePicked(pickerResult);
    }
  };
  return (
    <View>
      <View style={styles.nameContainer}>
        <View>
          <TouchableHighlight
            activeOpacity={0.05}
            style={{
              borderRadius: 100,
            }}
            onPress={() => {
              pickImage();
            }}
          >
            <FastImage
              style={{
                width: 150,
                height: 150,
                borderWidth: 2,
                borderColor: "black",
                borderRadius: 100,
              }}
              source={{
                uri: imageUri,
              }}
            />
          </TouchableHighlight>
          <AppText
            style={{ fontSize: 32, fontWeight: "bold" }}
          >{`${user.first_name} ${user.last_name}`}</AppText>
          <AppText style={styles.username}>{user.username}</AppText>
          <AppText>{user.age}</AppText>
          <AppText style={{ fontWeight: "bold" }}>{user.followers}</AppText>
          <AppText style={{ color: "green" }}>{user.averageReturn}</AppText>
          <StarRating rating={user.rating} />
        </View>
      </View>
      <View style={{ paddingHorizontal: 24 }}></View>
      <View style={styles.descriptionContainer}>
        <AppText>{user?.description}</AppText>
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
  username: {},
  descriptionContainer: {
    width: "100%",
    marginTop: 8,
    paddingHorizontal: 24,
  },
});
export default UserProfile;
