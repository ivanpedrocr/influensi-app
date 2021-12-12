import React from "react";
import { View } from "react-native";
import FastImage from "react-native-fast-image";
import ReactNativeModal from "react-native-modal";
import { useColor } from "../../hooks/useColor";
import { AppButton } from "../layout/Native-components";
import TextBox from "../layout/TextBox";

const WriteReviewModal = ({
  showReviewTextBox,
  setShowReviewTextBox,
  modalVisible,
  user,
}) => {
  const { colors } = useColor();
  return (
    <ReactNativeModal
      isVisible={showReviewTextBox && modalVisible?.closed}
      onBackdropPress={() => setShowReviewTextBox(false)}
      animationIn="fadeIn"
      animationInTiming={12}
      animationOut="fadeOut"
      backdropOpacity={0.3}
    >
      <View
        style={{
          backgroundColor: colors.background,
          borderRadius: 20,
          paddingHorizontal: 16,
          paddingTop: 8,
          paddingBottom: 16,
        }}
      >
        <FastImage
          source={{ uri: user?.avatar }}
          style={{ width: 66, height: 66, borderRadius: 100 }}
        />
        <TextBox
          style={{ height: 200, backgroundColor: colors.background }}
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

export default WriteReviewModal;
