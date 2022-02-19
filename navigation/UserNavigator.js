import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import UserConfigScreen from "../screens/user-config-screen";
import UserMenuScreen from "../screens/user-menu-screen";
import FavoritesScreen from "../screens/favorites-screen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ExploreScreen from "../screens/explore-screen";
import LanguagesScreen from "../screens/language-screen";
import AboutUsScreen from "../screens/about-us-screen";
import TermsAndConditionsScreen from "../screens/terms-and-conditions-screen";
import UserProfileScreen from "../screens/user-profile-screen";
import NotificationsScreen from "../screens/notifications-screen";
import MessagesScreen from "../screens/messages-screen";
import Icon from "react-native-vector-icons/Ionicons";
import { useAuthContext } from "../auth/auth-context";
import SplashScreen from "../screens/splash-screen";
import ConversationsScreen from "../screens/conversations-screen";
import StartUpScreen from "../screens/startup-screen";
import { useColor } from "../hooks/useColor";
import FavoritesUserProfileScreen from "../screens/favorites-user-profile-screen";
import firebase from "firebase";
import ConnectionLossScreen from "../screens/connection-loss-screen";

const FavoritesStack = createStackNavigator();
const MenuStack = createStackNavigator();
const BottomTab = createBottomTabNavigator();
const ExploreStack = createStackNavigator();
const MessagesStack = createStackNavigator();
const SplashStack = createStackNavigator();
const StartupStack = createStackNavigator();

const SplashStackScreen = ({ loading, connected }) => {
  return (
    <SplashStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {!loading && !connected ? (
        <SplashStack.Screen
          name="CONNECTION_LOSS_SCREEN"
          component={ConnectionLossScreen}
        />
      ) : (
        <SplashStack.Screen name="SPLASHSCREEN" component={SplashScreen} />
      )}
    </SplashStack.Navigator>
  );
};

const StartupStackScreen = () => {
  return (
    <StartupStack.Navigator screenOptions={{ headerShown: false }}>
      <StartupStack.Screen name="STARTUP" component={StartUpScreen} />
    </StartupStack.Navigator>
  );
};

const MessagesStackScreen = () => {
  return (
    <MessagesStack.Navigator initialRouteName="CONVERSATIONS">
      <MessagesStack.Screen
        name="CONVERSATIONS"
        component={ConversationsScreen}
      />
      <MessagesStack.Screen name="MESSAGES" component={MessagesScreen} />
    </MessagesStack.Navigator>
  );
};

const ExploreStackScreen = () => {
  return (
    <ExploreStack.Navigator>
      <ExploreStack.Screen name="EXPLORE" component={ExploreScreen} />
    </ExploreStack.Navigator>
  );
};

const MenuStackScreen = () => {
  return (
    <MenuStack.Navigator initialRouteName="USER_PROFILE">
      <MenuStack.Screen name="USER_PROFILE" component={UserProfileScreen} />
      <MenuStack.Screen name="USER_MENU" component={UserMenuScreen} />
      <MenuStack.Screen name="NOTIFICATIONS" component={NotificationsScreen} />
      <MenuStack.Screen name="USER_CONFIG" component={UserConfigScreen} />
      <MenuStack.Screen name="LANGUAGES_SETTINGS" component={LanguagesScreen} />
      <MenuStack.Screen name="ABOUT_US" component={AboutUsScreen} />
      <MenuStack.Screen
        name="TERMS_AND_CONDITIONS"
        component={TermsAndConditionsScreen}
      />
    </MenuStack.Navigator>
  );
};

const FavoritesStackScreen = () => {
  return (
    <FavoritesStack.Navigator>
      <FavoritesStack.Screen name="FAVORITES" component={FavoritesScreen} />
      <FavoritesStack.Screen
        name="PROFILE"
        component={FavoritesUserProfileScreen}
      />
    </FavoritesStack.Navigator>
  );
};

const UserNavigator = () => {
  const [connected, setConnected] = useState(false);
  const [{ token, userId, loading, user }, authDispatch] = useAuthContext();
  const { colors, dark } = useColor();
  const connectedRef = firebase.database().ref(".info/connected");
  useEffect(() => {
    const unsubscribe = connectedRef.on("value", (snap) => {
      if (snap?.val?.() === true) {
        setConnected(true);
      } else {
        setConnected(false);
      }
    });
    return unsubscribe;
  }, []);
  return (
    <NavigationContainer theme={{ colors, dark }}>
      {token && userId && user?.username && connected ? (
        <BottomTab.Navigator screenOptions={{ headerShown: false }}>
          <BottomTab.Screen
            name="Explore"
            component={ExploreStackScreen}
            options={{
              tabBarIcon: () => {
                return (
                  <Icon name="compass-outline" size={24} color={colors.text} />
                );
              },
            }}
          />
          <BottomTab.Screen
            name="Favorites"
            component={FavoritesStackScreen}
            options={{
              tabBarIcon: () => {
                return (
                  <Icon name="bookmark-outline" size={24} color={colors.text} />
                );
              },
            }}
          />
          <BottomTab.Screen
            name="Messages"
            component={MessagesStackScreen}
            options={{
              lazy: false,
              tabBarIcon: () => {
                return (
                  <Icon
                    name="chatbubble-outline"
                    size={24}
                    color={colors.text}
                  />
                );
              },
            }}
          />
          <BottomTab.Screen
            name="Profile"
            component={MenuStackScreen}
            options={{
              tabBarIcon: () => {
                return (
                  <Icon name="person-outline" size={24} color={colors.text} />
                );
              },
            }}
          />
        </BottomTab.Navigator>
      ) : loading || !connected ? (
        <SplashStackScreen loading={loading} connected={connected} />
      ) : (
        <StartupStackScreen />
      )}
    </NavigationContainer>
  );
};

export default UserNavigator;
