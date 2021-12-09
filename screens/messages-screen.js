import React, { useRef, useState } from "react";
import { View, StyleSheet, FlatList, KeyboardAvoidingView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import firebase from "firebase";

import { useAuthContext } from "../auth/auth-context";

import {
  AppScreen,
  AppTextInput,
} from "../components/layout/Native-components";
import AppText from "../components/layout/AppText";
import sendMessage from "../actions/send-message";

import { useHeaderHeight } from "@react-navigation/elements";

import fetchMessages from "../actions/fetch-message";
import { findLastIndex } from "../utils/findLastIndex";
import { useColor } from "../hooks/useColor";

const MessagesScreen = ({ route, navigation, ...props }) => {
  const listViewRef = useRef();
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [authValues, authDispatch] = useAuthContext();
  const [messageStatus, setMessageStatus] = useState("");
  const { chatId } = route.params;
  const db = firebase.database();
  const headerHeight = useHeaderHeight();
  const { colors } = useColor();

  const updateMessages = (message) => setMessages((prev) => [...prev, message]);
  const sendNewMessage = async () => {
    const timestamp = new Date().toISOString();
    if (messageInput.trim()) {
      setMessageStatus("");
      setMessageInput("");
      await sendMessage(
        messageInput,
        timestamp,
        authValues,
        chatId,
        setMessageStatus
      );
      updateMessages({
        message: messageInput,
        timestamp,
        sentBy: authValues.userId,
      });
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      const getMessages = async () => {
        const messageList = await fetchMessages(chatId);
        if (messageList) {
          setMessages(messageList);
        }
        db.ref(`conversations/${chatId}/lastMessage`).on(
          "value",
          (snapshot) => {
            if (snapshot.val()) {
              if (
                snapshot.val().message &&
                snapshot.val().sentBy !== authValues.userId &&
                snapshot.val().timestamp !==
                  messageList?.[messageList?.length - 1]?.timestamp
              ) {
                updateMessages(snapshot.val());
              }
            }
          }
        );
      };
      getMessages();
      return () => {
        db.ref(`conversations/${chatId}/lastMessage`).off();
      };
    }, [authValues.userId])
  );
  return (
    <AppScreen style={styles.screen}>
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={headerHeight}
        style={styles.screen}
      >
        <FlatList
          contentContainerStyle={styles.messagesList}
          nestedScrollEnabled
          ref={listViewRef}
          onContentSizeChange={() => {
            listViewRef.current.scrollToEnd();
          }}
          keyExtractor={(msg) => msg.timestamp}
          data={messages}
          renderItem={({ item, index }) => {
            return (
              <View>
                <View
                  style={{
                    ...styles.message,
                    backgroundColor:
                      item.sentBy === authValues.userId
                        ? colors.primary
                        : colors.lightGray,
                    alignSelf:
                      item.sentBy === authValues.userId
                        ? "flex-end"
                        : "flex-start",
                  }}
                >
                  <AppText
                    style={{
                      color:
                        item.sentBy === authValues.userId
                          ? "white"
                          : colors.text,
                    }}
                  >
                    {item.message}
                  </AppText>
                </View>
                {index ===
                  findLastIndex(messages, (msg) => {
                    return msg.sentBy === authValues.userId;
                  }) && (
                  <AppText
                    style={{
                      alignSelf: "flex-end",
                      color: colors.accentGray,
                      marginRight: 8,
                      fontSize: 12,
                    }}
                  >
                    {messageStatus}
                  </AppText>
                )}
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
            <Ionicons
              name="arrow-forward-circle-outline"
              size={32}
              color={colors.text}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  textInputContainer: {
    alignItems: "center",
    marginTop: "auto",
    padding: 8,
    flexDirection: "row",
    justifyContent: "center",
  },
  message: {
    display: "flex",
    maxWidth: "60%",
    marginHorizontal: 8,
    marginBottom: 6,
    padding: 12,
    borderRadius: 20,
  },
  messagesList: {
    justifyContent: "space-around",
  },
});

export default MessagesScreen;
