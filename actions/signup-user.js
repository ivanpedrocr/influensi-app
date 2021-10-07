import { API_KEY } from "@env";

const signupUser = async (email, password) => {
  const res = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
    }
  );
  if (!res.ok) {
    throw new Error("uh oh!");
  }
  const resData = await res.json();
  return resData;
};

export default signupUser;
