import firebase from "firebase";

export const updateUserValues = async ({ userId }, values) => {
  console.log(values);
  const db = firebase.database();
  const userRef = db.ref(`users/${userId}`);
  await userRef.update(values).catch((e) => console.log(e));
};
