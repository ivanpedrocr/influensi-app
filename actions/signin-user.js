import { API_KEY } from "@env";

export const signInUser = async (email, password) => {
  const res = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
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
