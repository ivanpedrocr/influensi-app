import firebase from "firebase";

const createConversation = async (
  user1,
  { userId },
  onError = (error) => {}
) => {
  const db = firebase.database();
  try {
    const userConversations = await db
      .ref(`users/${userId}/conversations`)
      .get()
      .then((snapshot) => snapshot.val());
    if (userConversations) {
      const conversationUsers = await Promise.all(
        Object.values(userConversations).map(async (conversation) => {
          const users = await (
            await db.ref(`conversations/${conversation}/users`).get()
          ).val();
          return { users: Object.values(users), conversation };
        })
      );
      const currentConversation = conversationUsers.filter((conversation) =>
        conversation.users.includes(user1)
      );
      if (currentConversation.length && currentConversation[0].conversation) {
        return currentConversation[0].conversation;
      }
    }
    if (user1 && userId) {
      const pushKey = db.ref("conversations").push().key;
      await db.ref(`/users/${user1}/conversations`).push(pushKey);
      await db.ref(`/users/${userId}/conversations`).push(pushKey);
      await db.ref(`/conversations/${pushKey}/users`).push(user1);
      await db.ref(`/conversations/${pushKey}/users`).push(userId);
      return pushKey;
    }
  } catch (e) {
    console.log(e);
    onError(e);
  }
};

export default createConversation;
