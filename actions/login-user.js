const loginUser = (email, password) => {
  fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.API_KEY}`,
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
};
