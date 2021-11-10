import firebase from "firebase";

const fetchConversations = async ({ userId }) => {
  const db = firebase.database();
  const userChats = await db
    .ref(`users/${userId}/conversations`)
    .once("value")
    .then((snapshot) => snapshot.val());
  if (userChats) {
    const conversationsUsers = async () => {
      const users = await Promise.all(
        Object.values(userChats).map(async (chatId) => {
          return db
            .ref(`conversations/${chatId}/users`)
            .once("value")
            .then((snapshot) => snapshot.val());
        })
      );
      const findUsers = await Promise.all(
        users.map(async (users, i) => {
          const uid = Object.values(users).find((user) => user !== userId);
          const userRef = db.ref(`users/${uid}`);
          const firstName = userRef
            .child("firstName")
            .once("value")
            .then((snapshot) => snapshot.val());
          const lastName = userRef
            .child("lastName")
            .once("value")
            .then((snapshot) => snapshot.val());
          const avatar = userRef
            .child("avatar")
            .once("value")
            .then((snapshot) => snapshot.val());
          const user = await Promise.all([firstName, lastName, avatar]);
          return {
            firstName: user[0],
            lastName: user[1],
            avatar: user[2],
            chatId: Object.values(userChats)[i],
          };
        })
      );
      return findUsers;
    };
    const userList = await conversationsUsers();
    return userList;
  } else {
    return [{ error: "No Conversations Found." }];
  }
};

export default fetchConversations;
