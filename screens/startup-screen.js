import React, { useEffect, useState } from "react";
import SplashScreen from "./splash-screen";
import { useAuthContext } from "../auth/auth-context";
import AuthScreen from "./sign-up-screen";
import firebase from "firebase";

const StartUpScreen = ({ navigation, ...props }) => {
  const [signedIn, setSignedIn] = useState(null);
  const [authValues, authDispatch] = useAuthContext();
  const auth = firebase.auth();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const getToken = async () => {
          const token = await user.getIdToken();
          authDispatch({
            type: "SIGNIN",
            payload: { token, userId: user.uid },
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
