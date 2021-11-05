import firebase from "firebase";

const createConversation = async (user1, { userId }) => {
  const db = firebase.database();
  const pushKey = db.ref("conversations").push().key;
  let userUpdates = {};
  userUpdates[`/users/${user1}/conversations`] = pushKey;
  userUpdates[`/users/${userId}/conversations`] = pushKey;
  await db.ref().update({
    ["/conversations/" + pushKey + "/users"]: { user1, user2: userId },
  });
  await db.ref().update(userUpdates);
  return pushKey;
};

export default createConversation;
