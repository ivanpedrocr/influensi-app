const signupUser = async (email, password) => {
  const res = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAa9Gln4Gsi0J9AwX-r2NVQbhNcW90Xd-E`,
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
};

export default signupUser;
