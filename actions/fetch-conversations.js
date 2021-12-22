import firebase from "firebase";

const fetchConversations = async ({ userId }, onError = (error) => {}) => {
  const db = firebase.database();
  try {
    const userChats = await db
      .ref(`users/${userId}/conversations`)
      .get()
      .then((snapshot) => snapshot.val());
    if (userChats) {
      const conversationsUsers = async () => {
        const conversationsList = await Promise.all(
          Object.keys(userChats).map(async (chatId) => {
            return db
              .ref(`conversations/${chatId}`)
              .get()
              .then((snapshot) => snapshot.val());
          })
        );
        const findUsers = await Promise.all(
          conversationsList.map(async (conversation, i) => {
            const uid = Object.keys(conversation.users).find(
              (user) => user !== userId
            );
            const userRef = db.ref(`users/${uid}`);
            const first_name = await userRef
              .child("first_name")
              .get()
              .then((snapshot) => snapshot.val());
            const last_name = await userRef
              .child("last_name")
              .get()
              .then((snapshot) => snapshot.val());
            const avatar = await userRef
              .child("avatar")
              .get()
              .then((snapshot) => snapshot.val());
            return {
              first_name,
              last_name,
              avatar,
              chatId: Object.keys(userChats)[i],
              last_message: conversation.lastMessage,
            };
          })
        );
        return findUsers;
      };
      const userList = await conversationsUsers();
      return userList;
    } else {
      return null;
    }
  } catch (e) {
    onError(e);
  }
};

export default fetchConversations;
