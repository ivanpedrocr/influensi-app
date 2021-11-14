import firebase from "firebase";

const signupUser = async ({ email, password, ...userValues }) => {
  const auth = firebase.auth();
  const db = firebase.database();
  const user = await auth.createUserWithEmailAndPassword(email, password);
  await db
    .ref(`users/${user.user.uid}`)
    .set({ ...userValues, email, age: userValues.age.toISOString() });
};

export default signupUser;
