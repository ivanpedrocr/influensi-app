import firebase from "firebase";
const sendMessage = async (
  message,
  timestamp,
  { userId },
  chatId,
  setMessageStatus
) => {
  const msg = {
    message,
    timestamp,
    sentBy: userId,
  };
  if (message) {
    const db = firebase.database();
    try {
      await db.ref(`chatMessages/${chatId}`).push(msg);
      await db.ref(`conversations/${chatId}/lastMessage`).set(msg);
      setMessageStatus("Sent");
    } catch (e) {
      setMessageStatus("Failed to send");
      console.log(e);
    }
  }
};

export default sendMessage;
