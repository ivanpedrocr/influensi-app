import firebase from "firebase";

export const signInUser = async (email, password) => {
  const auth = firebase.auth();
  const db = firebase.database();
  try {
    await auth.signInWithEmailAndPassword(email, password);
  } catch (e) {
    console.log(e);
  }
};
