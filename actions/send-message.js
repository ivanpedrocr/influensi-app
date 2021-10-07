import { API_URL } from "@env";

const sendMessage = async (message, { userId, token }) => {
  if (message) {
    const response = await fetch(
      `${API_URL}/${userId}/messages.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      }
    );
    const result = await response.json();
    console.log(result);
  }
};

export default sendMessage;
