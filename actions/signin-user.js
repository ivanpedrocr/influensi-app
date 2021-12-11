import firebase from "firebase";

export const signInUser = async (email, password, onError = (error) => {}) => {
  const auth = firebase.auth();
  try {
    await auth.signInWithEmailAndPassword(email, password);
  } catch (e) {
    onError(e);
  }
};
