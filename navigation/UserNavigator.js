import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import UserConfigScreen from "../screens/user-config-screen";
import UserMenuScreen from "../screens/user-menu-screen";
import UserProfile from "../user/UserProfile";
import FavoritesScreen from "../screens/favorites-screen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ExploreScreen from "../screens/explore-screen";
import LanguagesScreen from "../screens/language-screen";
import AboutUsScreen from "../screens/about-us-screen";
import TermsAndConditionsScreen from "../screens/terms-and-conditions-screen";
import UserProfileScreen from "../screens/user-profile-screen";
import NotificationsScreen from "../screens/notifications-screen";
import MessagesScreen from "../screens/messages-screen";

const FavoritesStack = createStackNavigator();
const MenuStack = createStackNavigator();
const BottomTab = createBottomTabNavigator();
const ExploreStack = createStackNavigator();
const MessagesStack = createStackNavigator();

const MessagesStackScreen = () => {
  return (
    <MessagesStack.Navigator>
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
    </FavoritesStack.Navigator>
  );
};

const UserNavigator = () => {
  return (
    <NavigationContainer>
      <BottomTab.Navigator screenOptions={{ headerShown: false }}>
        <BottomTab.Screen name="Explore" component={ExploreStackScreen} />
        <BottomTab.Screen name="Favorites" component={FavoritesStackScreen} />
        <BottomTab.Screen name="Menu" component={MenuStackScreen} />
        <BottomTab.Screen name="Messages" component={MessagesStackScreen} />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
};

export default UserNavigator;
