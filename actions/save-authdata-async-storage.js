import { AUTHKEYASYNCSTORAGE } from "../constants/authConstants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const saveAuthValuesToStorage = async (obj) => {
  AsyncStorage.setItem(AUTHKEYASYNCSTORAGE, JSON.stringify(obj));
};
export default saveAuthValuesToStorage;
