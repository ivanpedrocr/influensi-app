export const initialAuthState = {
  token: null,
  userId: null,
  loading: false,
  user: {},
};

const AuthReducer = (state, { type, payload }) => {
  switch (type) {
    case "SIGNIN":
      return {
        token: payload.token,
        userId: payload.userId,
        loading: false,
        user: payload.user,
      };
    case "SIGNUP":
      return {
        token: payload.token,
        userId: payload.userId,
        loading: false,
        user: payload.user,
      };
    case "LOADING":
      return { ...state, loading: true };
    case "LOGOUT":
      return { token: null, userId: null, loading: false, user: {} };
    case "GET_USER":
      return { ...state, user: payload.user };
    case "UPDATE_USER":
      return { ...state, user: { ...state.user, ...payload.user } };
  }
};

export default AuthReducer;
