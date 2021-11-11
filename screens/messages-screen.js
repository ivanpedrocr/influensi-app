import React, { useRef, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import firebase from "firebase";

import { useAuthContext } from "../auth/auth-context";

import { AppTextInput } from "../components/layout/Native-components";
import AppText from "../components/layout/AppText";
import { appColors } from "../styles/app-styles";
import sendMessage from "../actions/send-message";

import fetchMessages from "../actions/fetch-message";

const MessagesScreen = ({ route, navigation, ...props }) => {
  const listViewRef = useRef();
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [authValues, authDispatch] = useAuthContext();
  const { chatId } = route.params;
  const db = firebase.database();

  const updateMessages = (message) => setMessages((prev) => [...prev, message]);
  const sendNewMessage = async () => {
    const timestamp = new Date().toISOString();
    await sendMessage(messageInput, timestamp, authValues, chatId);
    updateMessages({
      message: messageInput,
      timestamp,
      sentBy: authValues.userId,
    });
    setMessageInput("");
  };
  useFocusEffect(
    React.useCallback(() => {
      const getMessages = async () => {
        const messageList = await fetchMessages(chatId);
        setMessages(messageList);
      };
      getMessages();
      db.ref(`conversations/${chatId}/lastMessage`).on("value", (snapshot) => {
        if (
          snapshot.val().message &&
          snapshot.val().sentBy !== authValues.userId
        ) {
          updateMessages(snapshot.val());
        }
      });
      return () => {
        db.ref(`conversations/${chatId}/lastMessage`).off();
      };
    }, [authValues.userId])
  );

  return (
    <View style={styles.screen}>
      <FlatList
        contentContainerStyle={styles.messagesList}
        nestedScrollEnabled
        ref={listViewRef}
        onContentSizeChange={() => {
          listViewRef.current.scrollToEnd();
        }}
        keyExtractor={(msg) => msg.timestamp}
        data={messages}
        renderItem={({ item }, i) => {
          return (
            <View style={styles.message}>
              <AppText style={{ color: "white" }}>{item.message}</AppText>
            </View>
          );
        }}
      ></FlatList>
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
