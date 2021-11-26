import AsyncStorage from "@react-native-async-storage/async-storage";

const THEME = "THEME";
const saveThemeToStorage = async (colorMode) => {
  if (colorMode) {
    await AsyncStorage.setItem(THEME, colorMode, (e) => {
      if (e) {
        console.log(e);
      }
    });
  }
};
export default saveThemeToStorage;
