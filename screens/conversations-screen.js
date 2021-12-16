import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import FastImage from "react-native-fast-image";
import { useState } from "react/cjs/react.development";
import fetchConversations from "../actions/fetch-conversations";
import { useAuthContext } from "../auth/auth-context";
import AppText from "../components/layout/AppText";
import MenuItemTouchable from "../components/layout/MenuItemTouchable";
import { AppScreen } from "../components/layout/Native-components";
import { useColor } from "../hooks/useColor";
import SplashScreen from "./splash-screen";

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
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <FastImage
                        style={styles.userImage}
                        source={{
                          uri: c.avatar,
                        }}
                      />
                      <AppText style={{ fontSize: 20, fontWeight: "600" }}>
                        {c.first_name} {c.last_name}
                      </AppText>
                    </View>
                    {c?.last_message?.message && (
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
