import React, { useRef } from "react";
import {
  Text,
  View,
  Stylesheet,
  StyleSheet,
  TextInput,
  Touchable,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import {
  AppScreen,
  AppTextInput,
  Typography,
} from "../components/layout/Native-components";
import { Ionicons } from "@expo/vector-icons";
import {
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { useState } from "react/cjs/react.development";
import AppText from "../components/layout/AppText";
import { appColors } from "../styles/app-styles";
import sendMessage from "../actions/send-message";
import { useAuthContext } from "../auth/auth-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { db } from "../config/firebase";

const MessagesScreen = (props) => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [authValues, authDispatch] = useAuthContext();
  const headerHeight = useHeaderHeight();
  const listViewRef = useRef();

  const sendNewMessage = async () => {
    await sendMessage(messageInput, authValues);
    setMessages((prev) => [...prev, messageInput]);
    setMessageInput("");
  };
  return (
    <AppScreen>
      <KeyboardAvoidingView
        behavior="padding"
        style={{ flex: 1 }}
        keyboardVerticalOffset={headerHeight}
      >
        <ScrollView
          contentContainerStyle={styles.messagesList}
          ref={listViewRef}
          onContentSizeChange={() => {
            listViewRef.current.scrollToEnd();
          }}
        >
          {messages.map((message, i) => (
            <View style={styles.message} key={i}>
              <AppText style={{ color: "white" }}>{message}</AppText>
            </View>
          ))}
        </ScrollView>
        <View style={styles.textInputContainer}>
          <View style={{ width: "90%" }}>
            <AppTextInput
              autoFocus={true}
              placeholder="type your message here..."
              value={messageInput}
              onChangeText={(text) => {
                setMessageInput(text);
              }}
            />
          </View>
          <View>
            <TouchableOpacity
              onPress={sendNewMessage}
              style={{ marginLeft: 4 }}
              activeOpacity={0.19}
            >
              <Ionicons name="arrow-forward-circle-outline" size={32} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  textInputContainer: {
    alignItems: "center",
    borderTopColor: appColors.accentGray,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 8,
  },
  message: {
    display: "flex",
    maxWidth: "66%",
    marginHorizontal: 8,
    marginBottom: 8,
    backgroundColor: appColors.primary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    width: "auto",
  },
  messagesList: {
    justifyContent: "space-around",
    alignItems: "flex-end",
  },
});

export default MessagesScreen;
