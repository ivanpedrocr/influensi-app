import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { uploadImage } from "../../actions/upload-image";
import {
  launchImageLibraryAsync,
  requestMediaLibraryPermissionsAsync,
} from "expo-image-picker";
import { useColor } from "../../hooks/useColor";
import AppText from "./AppText";
import Image from "./AppImage";

const ImageSelector = ({
  style,
  onImageUpload = (uploadUrl) => {},
  profileImageUri,
  setProfileImageUri = (uri) => {},
  error,
}) => {
  const { colors } = useColor();
  const handleImagePicked = async (pickerResult) => {
    try {
      if (!pickerResult.cancelled) {
        const uploadUrl = await uploadImage(pickerResult.uri, authValues);
        setProfileImageUri(pickerResult.uri);
        onImageUpload(uploadUrl);
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
      {error && (
        <AppText style={{ color: colors.red }}>{error.message}</AppText>
      )}
      <TouchableOpacity
        onPress={() => {
          pickImage();
        }}
        style={[styles(profileImageUri).image, style, { borderWidth: 0 }]}
      >
        <Image
          style={[styles(profileImageUri).image, style]}
          source={{
            uri: profileImageUri,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};
const styles = (profileImageUri) =>
  StyleSheet.create({
    image: {
      width: 150,
      height: 150,
      borderRadius: 100,
      borderColor: "black",
      borderWidth: profileImageUri ? 0 : 2,
    },
  });
export default ImageSelector;
