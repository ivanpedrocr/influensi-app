import firebase from "firebase";

export const signInUser = async (email, password) => {
  const auth = firebase.auth();
  await auth.signInWithEmailAndPassword(email, password);
};
