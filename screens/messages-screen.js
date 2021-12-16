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
      const status = await sendMessage(
        messageInput,
        timestamp,
        authValues,
        chatId,
        (e) => setMessageStatus("Failed to send.")
      );
      setMessageStatus(status);
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
    <AppScreen>
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={headerHeight}
        style={styles(colors).screen}
      >
        <FlatList
          contentContainerStyle={styles(colors).messagesList}
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
                    ...styles(colors).message,
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
        <View style={styles(colors).textInputContainer}>
          <View style={{ maxWidth: "90%", minWidth: "90%" }}>
            <AppTextInput
              autoFocus={true}
              multiline={true}
              placeholder="type your message here..."
              value={messageInput}
              onChangeText={(text) => {
                setMessageInput(text);
              }}
            />
          </View>
          <TouchableOpacity onPress={sendNewMessage} activeOpacity={0.19}>
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

const styles = (colors) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      width: "100%",
      paddingHorizontal: 8,
    },
    textInputContainer: {
      flexDirection: "row",
      alignItems: "flex-end",
      backgroundColor: colors.lightGray,
      borderRadius: 30,
    },
    message: {
      display: "flex",
      maxWidth: "60%",
      marginBottom: 6,
      padding: 12,
      borderRadius: 20,
    },
    messagesList: {
      justifyContent: "space-around",
    },
  });

export default MessagesScreen;
