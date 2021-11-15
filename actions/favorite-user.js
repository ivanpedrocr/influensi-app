import { API_URL } from "@env";
import firebase from "firebase";

export const favoriteUser = async (user, { userId }) => {
  console.log(user);
  const db = firebase.database();
  // const uid = db.ref(`users`).push().key;
  // await db.ref(`users/${uid}`).update({ id: uid, ...user });
  await db.ref(`users/${userId}/favorites`).push(user);
};

export const fetchFavoriteUsersList = async ({ token, userId }) => {
  const res = await fetch(
    `${API_URL}/users/${userId}/favorites.json?auth=${token}`
  );
  const resData = await res.json();
  return resData;
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
