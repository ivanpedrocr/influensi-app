import firebase from "firebase";

const createConversation = async (user1, { userId }) => {
  const db = firebase.database();
  const pushKey = db.ref("conversations").push().key;
  await db.ref(`/users/${user1}/conversations`).push(pushKey);
  await db.ref(`/users/${userId}/conversations`).push(pushKey);
  await db.ref(`/conversations/${pushKey}/users`).push(user1);
  await db.ref(`/conversations/${pushKey}/users`).push(userId);
  return pushKey;
};

export default createConversation;
