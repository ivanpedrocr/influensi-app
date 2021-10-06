import React, { useRef } from "react";
import {
  Text,
  View,
  Stylesheet,
  StyleSheet,
  TextInput,
  Touchable,
  ScrollView,
} from "react-native";
import {
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

const MessagesScreen = (props) => {
  const listViewRef = useRef();
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const sendNewMessage = async () => {
    await sendMessage(messageInput);
    setMessages((prev) => [...prev, messageInput]);
    setMessageInput("");
  };
  return (
    <View style={styles.screen}>
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
        <AppTextInput
          autoFocus={true}
          placeholder="type your message here..."
          value={messageInput}
          onChangeText={(text) => {
            setMessageInput(text);
          }}
        />
        <TouchableOpacity
          onPress={sendNewMessage}
          style={{ marginLeft: 4 }}
          activeOpacity={0.19}
        >
          <Ionicons name="arrow-forward-circle-outline" size={32} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  textInputContainer: {
    alignItems: "center",
    marginTop: "auto",
    borderTopColor: appColors.accentGray,
    borderTopWidth: 2,
    paddingTop: 16,
    paddingHorizontal: 24,
    paddingBottom: 24,
    flexDirection: "row",
    justifyContent: "center",
  },
  message: {
    display: "flex",
    maxWidth: "50%",
    marginHorizontal: 8,
    marginBottom: 10,
    backgroundColor: appColors.messageBlue,
    padding: 12,
    borderRadius: 20,
    width: "auto",
  },
  messagesList: {
    justifyContent: "space-around",
    alignItems: "flex-end",
  },
});

export default MessagesScreen;
