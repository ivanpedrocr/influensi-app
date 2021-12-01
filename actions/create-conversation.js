import firebase from "firebase";

const createConversation = async (user1, { userId }) => {
  const db = firebase.database();
  try {
    if (user1 && userId) {
      const pushKey = db.ref("conversations").push().key;
      await db.ref(`/users/${user1}/conversations`).push(pushKey);
      await db.ref(`/users/${userId}/conversations`).push(pushKey);
      await db.ref(`/conversations/${pushKey}/users`).push(user1);
      await db.ref(`/conversations/${pushKey}/users`).push(userId);
    }
  } catch (e) {
    console.log(e);
  }

  return pushKey;
};

export default createConversation;
