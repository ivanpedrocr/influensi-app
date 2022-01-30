import firebase from "firebase";
import { getAge } from "../utils/getBirthDate";

const fetchExploreUserList = async (
  { userId, user: { user_type } },
  onError = (error) => {},
  updateList = (value) => {}
) => {
  const exploreUserType =
    user_type === "INFLUENCER" ? "BUSINESS" : "INFLUENCER";
  const db = firebase.database();
  try {
    const userList = await db.ref(`${exploreUserType.toLowerCase()}`).get();
    const res = await userList.val();
    let fetchedUsers = [];
    for (const userId in res) {
      const userRef = db.ref(`users/${userId}`);
      const userValues = await userRef.get().then((snapshot) => snapshot.val());
      updateList({ ...userValues, id: userId });
      fetchedUsers.push({ ...userValues, id: userId });
    }
    return fetchedUsers;
  } catch (e) {
    onError(e);
  }
};

export default fetchExploreUserList;
