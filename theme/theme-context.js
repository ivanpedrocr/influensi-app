import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useState } from "react";
import { useColorScheme } from "react-native";
import { useEffect } from "react/cjs/react.development";
import saveThemeToStorage from "../actions/save-theme-asyncStorage";

const ThemeContext = React.createContext();
const ThemeProvider = ({ children }) => {
  const userDefaultTheme = useColorScheme();
  const [colorMode, setColorMode] = useState(userDefaultTheme || "dark");
  const toggleColorMode = () => {
    setColorMode((prev) => {
      const mode = prev === "light" ? "dark" : "light";
      saveThemeToStorage(mode);
      return mode;
    });
  };
  useEffect(() => {
    (async () => {
      const storedTheme = await AsyncStorage.getItem("THEME");
      if (storedTheme) {
        setColorMode(storedTheme);
      }
    })();
  }, []);
  return (
    <ThemeContext.Provider value={[colorMode, toggleColorMode]}>
      {children}
    </ThemeContext.Provider>
  );
};
export const useTheme = () => useContext(ThemeContext);

export default ThemeProvider;
