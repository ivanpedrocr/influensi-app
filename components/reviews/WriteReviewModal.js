import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import FastImage from "react-native-fast-image";
import ReactNativeModal from "react-native-modal";
import { useColor } from "../../hooks/useColor";
import { AppButton } from "../layout/Native-components";
import { StarPicker } from "../layout/Star";
import TextBox from "../layout/TextBox";

const WriteReviewModal = ({
  showReviewTextBox,
  setShowReviewTextBox,
  modalVisible,
  user,
}) => {
  const { colors } = useColor();
  const [rating, setRating] = useState(0);
  return (
    <ReactNativeModal
      isVisible={showReviewTextBox && modalVisible?.closed}
      onBackdropPress={() => setShowReviewTextBox(false)}
      animationIn="fadeIn"
      animationInTiming={12}
      animationOut="fadeOut"
      backdropOpacity={0.3}
    >
      <View style={styles(colors).modal}>
        <View style={styles(colors).topBar}>
          <FastImage
            source={{ uri: user?.avatar }}
            style={styles(colors).profileImage}
          />
          <StarPicker
            rating={rating}
            onSelect={(rating) => setRating(rating)}
          />
        </View>
        <TextBox
          style={styles(colors).textBox}
          placeholder="Write a review..."
        />
        <AppButton
          title="Submit"
          style={{ alignSelf: "flex-end" }}
          fontSize={16}
        />
      </View>
    </ReactNativeModal>
  );
};

const styles = (colors) =>
  StyleSheet.create({
    textBox: { height: 200, backgroundColor: colors.background },
    profileImage: { width: 66, height: 66, borderRadius: 100 },
    modal: {
      backgroundColor: colors.background,
      borderRadius: 20,
      paddingHorizontal: 16,
      paddingTop: 8,
      paddingBottom: 16,
    },
    topBar: {
      flexDirection: "row",
      alignItems: "flex-end",
      justifyContent: "space-between",
    },
  });

export default WriteReviewModal;
