import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useState } from "react/cjs/react.development";
import fetchConversations from "../actions/fetch-conversations";
import { useAuthContext } from "../auth/auth-context";
import AppText from "../components/layout/AppText";
import MenuItemTouchable from "../components/layout/MenuItemTouchable";
import { AppScreen } from "../components/layout/Native-components";
import { useColor } from "../hooks/useColor";
import SplashScreen from "./splash-screen";
import { formatMessageTime } from "../utils/formatMessageTime";
import Image from "../components/layout/AppImage";

const ConversationsScreen = ({ navigation, ...props }) => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [authValues, authDispatch] = useAuthContext();
  const { colors } = useColor();
  useFocusEffect(
    React.useCallback(() => {
      const getConversations = async () => {
        setLoading(true);
        const conversationUsersList = await fetchConversations(authValues);
        if (conversationUsersList) {
          setConversations(conversationUsersList);
        }
        setLoading(false);
      };
      getConversations();
    }, [])
  );
  return loading && conversations.length === 0 ? (
    <SplashScreen />
  ) : (
    <AppScreen>
      <ScrollView>
        <View>
          {conversations.length === 0 ? (
            <AppText>No Chats Found</AppText>
          ) : (
            conversations
              .map((c, i) => {
                return (
                  <MenuItemTouchable
                    style={styles.listItem}
                    key={i}
                    onPress={() => {
                      navigation.navigate("Messages", {
                        screen: "MESSAGES",
                        params: { chatId: c.chatId },
                      });
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <Image
                        style={styles.userImage}
                        source={{
                          uri: c.avatar || null,
                        }}
                      />
                      <AppText style={{ fontSize: 20, fontWeight: "600" }}>
                        {c.first_name} {c.last_name}
                      </AppText>
                      {c.last_message && (
                        <AppText
                          style={{
                            marginLeft: "auto",
                            color: colors.placeholderText,
                          }}
                        >
                          {formatMessageTime(c.last_message.timestamp)}
                        </AppText>
                      )}
                    </View>
                    {c?.last_message && (
                      <AppText
                        style={{
                          alignSelf: "flex-end",
                          color: colors.placeholderText,
                        }}
                        numberOfLines={1}
                      >
                        {c?.last_message?.message}
                      </AppText>
                    )}
                  </MenuItemTouchable>
                );
              })
              .reverse()
          )}
        </View>
      </ScrollView>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  listItem: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  userListName: {
    fontSize: 20,
  },
  userImage: {
    minWidth: 44,
    minHeight: 44,
    borderRadius: 100,
    marginRight: 16,
  },
});

export default ConversationsScreen;
