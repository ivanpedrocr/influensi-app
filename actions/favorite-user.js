import { API_URL } from "@env";
import firebase from "firebase";

export const favoriteUser = async (user, { userId }) => {
  const db = firebase.database();
  try {
    await db.ref(`users/${userId}/favorites/${user.id}`).update(user);
  } catch (e) {
    console.log(e);
  }
};

export const fetchFavoriteUsersList = async ({ token, userId }) => {
  const db = firebase.database();
  try {
    const favoritesList = await db.ref(`users/${userId}/favorites`).get();
    const resData = await favoritesList.val();
    return resData;
  } catch (e) {
    console.log(e);
  }
};

export const deleteFavoriteUser = async (user, { token, userId }) => {
  const res = await fetch(
    `${API_URL}/users/${userId}/favorites/${user}.json?auth=${token}`,
    {
      method: "DELETE",
    }
  );
  const resData = await res.json();
};
