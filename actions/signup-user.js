const signupUser = async (email, password) => {
  console.log({ email, password });
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
  const resData = await res.json();
  console.log(resData);
};

export default signupUser;
