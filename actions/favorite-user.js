import firebase from "firebase";

export const favoriteUser = async (user, { userId }) => {
  const db = firebase.database();
  try {
    await db.ref(`users/${userId}/favorites/${user.id}`).set(user.id);
  } catch (e) {
    console.log(e);
  }
};

export const fetchFavoriteUsersList = async ({ token, userId }) => {
  const db = firebase.database();
  try {
    const favoritesList = await db
      .ref(`users/${userId}/favorites`)
      .get()
      .then((snapshot) => snapshot.val());
    if (favoritesList) {
      const favorites = Object.values(favoritesList);
      const users = await Promise.all(
        favorites.map(async (userId) => {
          const user = await db
            .ref(`users/${userId}`)
            .get()
            .then((snapshot) => snapshot.val());
          return { id: userId, ...user };
        })
      );
      return users;
    }
  } catch (e) {
    console.log(e);
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
