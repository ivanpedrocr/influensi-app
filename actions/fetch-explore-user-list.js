import firebase from "firebase";
import { getAge } from "../utils/getBirthDate";

const fetchExploreUserList = async ({ userId }, onError = (error) => {}) => {
  const db = firebase.database();
  try {
    const userList = await db.ref(`users`).get();
    const res = await userList.val();
    const formattedUserList = Object.entries(res)
      .filter(([key, value]) => key !== userId)
      .map(([key, value]) => ({
        ...value,
        age: getAge(value.age),
        id: key,
      }));
    return formattedUserList;
  } catch (e) {
    onError(e);
  }
};

export default fetchExploreUserList;
