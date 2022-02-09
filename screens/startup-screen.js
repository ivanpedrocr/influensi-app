import React, { useEffect, useState } from "react";
import SplashScreen from "./splash-screen";
import { useAuthContext } from "../auth/auth-context";
import firebase from "firebase";
import { fetchUserProfile } from "../actions/fetch-user-profile";
import SignInScreen from "./sign-in-screen";
import SignUpScreen from "./sign-up-screen";
import { createStackNavigator } from "@react-navigation/stack";
import { Alert } from "react-native";

const AuthStack = createStackNavigator();

const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="SIGNIN" component={SignInScreen} />
      <AuthStack.Screen name="SIGNUP" component={SignUpScreen} />
    </AuthStack.Navigator>
  );
};
const StartUpScreen = ({ navigation, ...props }) => {
  const [signedIn, setSignedIn] = useState(null);
  const [authValues, authDispatch] = useAuthContext();
  const [error, setError] = useState(null);
  const auth = firebase.auth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const getToken = async () => {
          const token = await user.getIdToken();
          const loggedInUser = await fetchUserProfile(
            { userId: user.uid },
            (e) => {
              if (e) {
                setError(e);
                Alert.alert(e.message);
              }
            }
          );
          authDispatch({
            type: "SIGNIN",
            payload: { token, userId: user.uid, user: loggedInUser },
          });
        };
        getToken();
      } else {
        setSignedIn(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return signedIn === false ? (
    <AuthStackScreen navigation={navigation} />
  ) : (
    <SplashScreen />
  );
};
export default StartUpScreen;
