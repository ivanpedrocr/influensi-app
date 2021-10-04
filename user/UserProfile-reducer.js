export const userInitialState = {
  username: "ivanpedrocr",
  firstName: "Ivan",
  lastName: "Casas",
  age: "17",
  price: "$100.00",
  description: "Hi, I'm new to influensi.",
  accountType: "Business Pro",
  rating: 4.3,
  averageReturn: 150,
  followers: 999,
};

export const UserReducer = (state, { type, payload }) => {
  switch (type) {
    case "FIRST_NAME":
      return { ...state, firstName: payload.firstName };
    case "USERNAME":
      return { ...state, username: payload.username };
    case "LAST_NAME":
      return { ...state, lastName: payload.lastName };
    case "RATING":
      return { ...state, rating: payload.rating };
    case "AGE":
      return { ...state, age: payload.age };
    case "PRICE":
      return { ...state, price: payload.price };
    case "DESCRIPTION":
      return { ...state, description: payload.description };
    case "RATING":
      return { ...state, rating: payload.rating };
    case "ADD_USER":
      return { ...payload };
  }
};
