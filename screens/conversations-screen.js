import React, { useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useState } from "react/cjs/react.development";
import fetchConversations from "../actions/fetch-conversations";
import { useAuthContext } from "../auth/auth-context";
import AppText from "../components/layout/AppText";
import { AppScreen } from "../components/layout/Native-components";
import { appColors } from "../styles/app-styles";

const ConversationsScreen = ({ navigation, ...props }) => {
  const [conversations, setConversations] = useState([]);
  const [authValues, authDispatch] = useAuthContext();
  useEffect(async () => {
    const conversationUsersList = await fetchConversations(authValues);
    setConversations(conversationUsersList);
  }, []);
  console.log(conversations);
  return (
    <AppScreen>
      <ScrollView>
        <View style={styles.screen}>
          {conversations.map((c, i) => {
            return (
              <View style={styles.userListContainer} key={i}>
                <AppText>
                  {c.firstName} {c.lastName}
                </AppText>
              </View>
            );
          })}
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
});

export default ConversationsScreen;
