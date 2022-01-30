import firebase from "firebase";

const signupUser = async ({
  email,
  password,
  user_type,
  username,
  business_name,
  categories,
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
        categories,
        ...values,
      },
      [`${user_type.toLowerCase()}/${user.user.uid}`]: {
        categories,
      },
    });
  } catch (e) {
    console.log(e);
  }
};

export default signupUser;
