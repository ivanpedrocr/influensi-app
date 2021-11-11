import firebase from "firebase";

const fetchMessages = async (chatId) => {
  const db = firebase.database();
  try {
    const msgSnapshot = await db.ref(`chatMessages/${chatId}`).get();
    if (msgSnapshot.val()) {
      return Object.values(msgSnapshot.val());
    }
  } catch (error) {
    console.log(error);
  }
};

export default fetchMessages;
