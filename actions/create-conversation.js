import { API_URL } from "@env";

const createConversation = async (user, { userId, token }) => {
  const res = await fetch(`${API_URL}/conversations.json?auth=${token}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const resData = res.json();
  console.log(resData);
};
