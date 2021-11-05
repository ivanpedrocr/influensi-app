import firebase from "firebase";

const fetchMessage = async (chatId) => {
  const db = firebase.database();
  const chatRef = db.ref(`chatMessages/${chatId}`);
  chatRef.on("value", (snapshot) => {
    const data = snapshot.val();
    console.log(data);
  });
};

export default fetchMessage;
