import firebase from "firebase";
import { getAge } from "../utils/getBirthDate";

export const fetchUserProfile = async ({ userId }, onError = (error) => {}) => {
  try {
    const db = firebase.database();
    const user = await db
      .ref(`users/${userId}`)
      .get()
      .then((snapshot) => snapshot.val());
    return { ...user, age: getAge(user.age) };
  } catch (e) {
    onError(e);
  }
};
