import React from "react";
import UserNavigator from "./navigation/UserNavigator";
import AuthProvider from "./auth/auth-context";
import { firebaseConfig } from "./config/firebase";
import firebase from "firebase";

// const fetchFonts = () => {
//   return Font.loadAsync({
//     "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
//     "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
//   });
// };

export default function App() {
  // const [fontLoaded, setFontLoaded] = useState(false);
  // if (!fontLoaded) {
  //   return (
  //     <AppLoading
  //       startAsync={fetchFonts}
  //       onFinish={() => setFontLoaded(true)}
  //       onError={(err) => console.log(err)}
  //     />
  //   );
  // }
  firebase.initializeApp(firebaseConfig);
  return (
    <AuthProvider>
      <UserNavigator />
    </AuthProvider>
  );
}
