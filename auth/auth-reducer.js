export const initialAuthState = {
  token: null,
  userId: null,
  loading: false,
};

const AuthReducer = (state, { type, payload }) => {
  switch (type) {
    case "SIGNIN":
      return { token: payload.token, userId: payload.userId, loading: false };
    case "SIGNUP":
      return { token: payload.token, userId: payload.userId, loading: false };
    case "LOADING":
      return { ...state, loading: true };
  }
};

export default AuthReducer;
