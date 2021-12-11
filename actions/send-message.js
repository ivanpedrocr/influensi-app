import firebase from "firebase";
import { format } from "date-fns";
const sendMessage = async (message, timestamp, { userId }, chatId, onError) => {
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
      return `Sent ${format(new Date(timestamp), "h:mm aa")}`;
    } catch (e) {
      console.log(e);
      onError(e);
    }
  }
};

export default sendMessage;
