export const userInitialState = {
  username: "",
  first_name: "",
  last_name: "",
};

export const UserReducer = (state, { type, payload }) => {
  switch (type) {
    case "UPDATE_USER":
      return { ...state, ...payload };
  }
};
