import React, { useEffect, useState } from "react";
import SplashScreen from "./splash-screen";
import { useAuthContext } from "../auth/auth-context";
import AuthScreen from "./sign-up-screen";
import firebase from "firebase";
import { fetchUserProfile } from "../actions/fetch-user-profile";
import FastImage from "react-native-fast-image";

const StartUpScreen = ({ navigation, ...props }) => {
  const [signedIn, setSignedIn] = useState(null);
  const [authValues, authDispatch] = useAuthContext();
  const auth = firebase.auth();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const getToken = async () => {
          const token = await user.getIdToken();
          const loggedInUser = await fetchUserProfile({ userId: user.uid });
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
    <AuthScreen navigation={navigation} />
  ) : (
    <SplashScreen />
  );
};
export default StartUpScreen;
