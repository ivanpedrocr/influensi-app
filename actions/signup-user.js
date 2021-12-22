import firebase from "firebase";

const signupUser = async ({
  email,
  password,
  user_type,
  username,
  business_name,
  ...userValues
}) => {
  const auth = firebase.auth();
  const db = firebase.database();
  const values =
    user_type === "BUSINESS"
      ? { business_name }
      : { ...userValues, age: userValues.age.toISOString() };
  try {
    const user = await auth.createUserWithEmailAndPassword(email, password);
    await db.ref().update({
      [`users/${user.user.uid}`]: {
        email,
        username,
        user_type,
        ...values,
      },
      [`${user_type === "BUSINESS" ? "businesses" : "influencers"}/${
        user.user.uid
      }`]: true,
    });
  } catch (e) {
    console.log(e);
  }
};

export default signupUser;
