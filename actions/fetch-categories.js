import firebase from "firebase";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";

export const fetchCategories = async (onError = (e) => {}) => {
  try {
    const fetchedCategories = await firebase
      .database()
      .ref(`categories`)
      .get()
      .then((snapshot) => snapshot.val());
    if (fetchedCategories) {
      return Object.keys(fetchedCategories).map((category) => ({
        value: category,
        label: capitalizeFirstLetter(category.toLowerCase()),
      }));
    }
  } catch (e) {
    onError(e);
  }
};
