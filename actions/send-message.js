import firebase from "firebase";
const sendMessage = async (message, { userId }, chatId) => {
  if (message) {
    const db = firebase.database();
    db.ref(`chatMessages/${chatId}`).push({
      message,
      timestamp: new Date().toISOString(),
      sentBy: userId,
    });
  }
};

export default sendMessage;
