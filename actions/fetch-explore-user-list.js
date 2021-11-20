import firebase from "firebase";

const fetchExploreUserList = async () => {
  const db = firebase.database();
  try {
    const userList = await db.ref(`users`).get();
    const res = await userList.val();
    return res;
  } catch (e) {
    console.log(e);
  }
};

export default fetchExploreUserList;
