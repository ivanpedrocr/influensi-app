import { API_URL } from "@env";

const sendMessage = async (message) => {
  if (message) {
    const response = await fetch(`${API_URL}/messages.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });
    const result = await response.json();
  }
};

export default sendMessage;
