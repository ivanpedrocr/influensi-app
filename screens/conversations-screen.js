import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { useState } from "react/cjs/react.development";
import fetchConversations from "../actions/fetch-conversations";
import { useAuthContext } from "../auth/auth-context";
import AppText from "../components/layout/AppText";
import MenuItemTouchable from "../components/layout/MenuItemTouchable";
import { AppScreen } from "../components/layout/Native-components";
import { appColors } from "../styles/app-styles";
import SplashScreen from "./splash-screen";

const ConversationsScreen = ({ navigation, ...props }) => {
  const [conversations, setConversations] = useState([]);
  const [authValues, authDispatch] = useAuthContext();
  useFocusEffect(
    React.useCallback(() => {
      const getConversations = async () => {
        const conversationUsersList = await fetchConversations(authValues);
        setConversations(conversationUsersList);
      };
      getConversations();
    }, [])
  );
  return !conversations ? (
    <SplashScreen />
  ) : (
    <AppScreen>
      <ScrollView>
        <View>
          {conversations
            .map((c, i) => {
              if (c.error) {
                return (
                  <AppText
                    style={{ fontSize: 20, alignSelf: "center" }}
                    key={i}
                  >
                    {c.error}
                  </AppText>
                );
              }
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
                  <AppText style={{ fontSize: 20 }}>
                    {c.first_name} {c.last_name}
                  </AppText>
                  <Image
                    style={styles.userImage}
                    source={{
                      uri: c.avatar,
                    }}
                  />
                </MenuItemTouchable>
              );
            })
            .reverse()}
        </View>
      </ScrollView>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  userListContainer: {
    padding: 8,
    borderBottomWidth: 1,
    borderColor: "#bfbfbf",
    width: "100%",
  },
  listItem: {
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  userListName: {
    fontSize: 20,
  },
  userImage: {
    minWidth: 44,
    minHeight: 44,
    borderRadius: 100,
  },
});

export default ConversationsScreen;
