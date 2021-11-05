import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useState } from "react/cjs/react.development";
import AppText from "../components/layout/AppText";
import { AppScreen } from "../components/layout/Native-components";
import { appColors } from "../styles/app-styles";

const ConversationsScreen = ({ navigation, ...props }) => {
  const [conversations, setConversations] = useState([]);
  return (
    <AppScreen>
      <ScrollView>
        <View style={styles.screen}>
          {conversations.map((c, i) => {
            return <View style={styles.userListContainer} key={i}></View>;
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
