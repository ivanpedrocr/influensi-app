import firebase from "firebase";
import { format } from "date-fns";
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
      setMessageStatus(`Sent ${format(new Date(timestamp), "h:mm aa")}`);
    } catch (e) {
      setMessageStatus("Failed to send");
      console.log(e);
    }
  }
};

export default sendMessage;
