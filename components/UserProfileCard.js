import React from "react";
import { View } from "react-native";
import AppText from "./layout/AppText";

const UserProfileCard = ({ user }) => {
  return (
    <View>
      <AppText>
        {user.first_name} {user.last_name}
      </AppText>
      <AppText>{user.age}</AppText>
      <AppText>{user.username}</AppText>
      <AppText>{user.rating}</AppText>
      <AppText>{user.avatar}</AppText>
    </View>
  );
};

export default UserProfileCard;
