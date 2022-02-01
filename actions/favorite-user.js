import firebase from "firebase";
import { getAge } from "../utils/getBirthDate";

export const favoriteUser = async (user, { userId }) => {
  const db = firebase.database();
  try {
    await db.ref(`users/${userId}/favorites`).update({ [`${user.id}`]: true });
  } catch (e) {
    console.log(e);
  }
};

export const fetchFavoriteUsersList = async (
  { token, userId },
  onError = (error) => {}
) => {
  const db = firebase.database();
  try {
    const favoritesList = await db
      .ref(`users/${userId}/favorites`)
      .get()
      .then((snapshot) => snapshot.val());
    if (favoritesList) {
      const favorites = Object.keys(favoritesList);
      const users = await Promise.all(
        favorites.map(async (userId) => {
          const user = await db
            .ref(`users/${userId}`)
            .get()
            .then((snapshot) => snapshot.val());
          const name =
            user.business_name || `${user.first_name} ${user.last_name}`;
          return { ...user, name, id: userId };
        })
      );
      return users.map((user) => ({ ...user }));
    }
  } catch (e) {
    onError(e);
  }
};

export const deleteFavoriteUser = async (user, { token, userId }) => {
  const db = firebase.database();
  try {
    await db.ref(`users/${userId}/favorites/${user}`).remove((e) => {
      if (e) console.log(e);
    });
  } catch (e) {
    console.log(e);
  }
};
