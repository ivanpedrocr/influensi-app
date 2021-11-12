import firebase from "firebase";

const signupUser = async (email, password) => {
  const auth = firebase.auth();
  await auth.createUserWithEmailAndPassword(email, password);
};

export default signupUser;
