import firebase from "firebase";
const sendMessage = async (message, timestamp, { userId }, chatId) => {
  const msg = {
    message,
    timestamp,
    sentBy: userId,
  };
  if (message) {
    const db = firebase.database();
    db.ref(`chatMessages/${chatId}`).push(msg);
    db.ref(`conversations/${chatId}/lastMessage`).set(msg);
  }
};

export default sendMessage;
