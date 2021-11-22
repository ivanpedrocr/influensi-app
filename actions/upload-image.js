import { launchCameraAsync, launchImageLibraryAsync } from "expo-image-picker";
import firebase from "firebase";

export const uploadImage = async (uri, { userId }) => {
  const storage = firebase.storage();
  const db = firebase.database();
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed."));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });
  const fileRef = storage.ref(`profile_pictures/${userId}`);
  await fileRef.put(blob).then((snapshot) => {
    console.log("UPLOADED IMAGE BLOB");
  });
  blob.close();
  const fileUri = await fileRef.getDownloadURL(fileRef);
  await db.ref(`users/${userId}`).update({ avatar: fileUri });
  return fileUri;
};
