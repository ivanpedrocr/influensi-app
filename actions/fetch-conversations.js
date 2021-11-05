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
        users.map(async (chat) => {
          const uid = Object.values(chat).find((user) => user !== userId);
          return db
            .ref(`users/${uid}`)
            .once("value")
            .then((snapshot) => snapshot.val());
        })
      );
      return findUsers;
    };
    const userList = await conversationsUsers();
    return userList;
  } else {
    return [];
  }
};

export default fetchConversations;
