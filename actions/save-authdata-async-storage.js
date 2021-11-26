import { AUTHKEYASYNCSTORAGE } from "../constants/authConstants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const saveAuthValuesToStorage = async (obj) => {
  await AsyncStorage.setItem(AUTHKEYASYNCSTORAGE, JSON.stringify(obj));
};
export default saveAuthValuesToStorage;
