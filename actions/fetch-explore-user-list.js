import firebase from "firebase";
import { getSimilarElementsInArray } from "../utils/getSimilarElementsInArray";

const fetchExploreUserList = async (
  { user: { user_type = null } },
  onError = (error) => {},
  updateList = (value) => {},
  categoriesFilter
) => {
  const exploreUserType =
    user_type === "INFLUENCER" ? "BUSINESS" : "INFLUENCER";
  const db = firebase.database();
  try {
    const userObj = await db
      .ref(`${exploreUserType.toLowerCase()}`)
      .get()
      .then((snapshot) => snapshot.val());
    const userList = Object.entries(userObj).map(([key, value]) => ({
      key,
      ...value,
    }));
    const sortedUsers = userList.sort((p, c) => {
      const pCategories = Object.keys(p.categories);
      const cCategories = Object.keys(c.categories);
      const numSimilarP = getSimilarElementsInArray(
        pCategories,
        categoriesFilter
      ).length;
      const numSimilarC = getSimilarElementsInArray(
        cCategories,
        categoriesFilter
      ).length;
      return numSimilarC - numSimilarP;
    });
    let fetchedUsers = [];
    for (const user of sortedUsers) {
      const userRef = db.ref(`users/${user.key}`);
      const userValues = await userRef.get().then((snapshot) => snapshot.val());
      const name =
        userValues.business_name ||
        `${userValues.first_name} ${userValues.last_name}`;
      updateList({
        ...userValues,
        id: user.key,
        name,
      });
      fetchedUsers.push({
        ...userValues,
        id: user.key,
        name,
      });
    }
    return fetchedUsers;
  } catch (e) {
    onError(e);
  }
};

export default fetchExploreUserList;
