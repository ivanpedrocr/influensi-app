import firebase from "firebase";

const fetchExploreUserList = async () => {
  const db = firebase.database();
  const userList = await db.ref(`users`).get();
  const res = await userList.val();
  return res;
};

export default fetchExploreUserList;
