import firebase from "firebase";

const signupUser = async (email, password) => {
  const auth = firebase.auth();
  const user = await auth.createUserWithEmailAndPassword(email, password);
  await db.ref(`users/${user.user.uid}`).push({ email });
};

export default signupUser;
