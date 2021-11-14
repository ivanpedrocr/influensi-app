export const signUpInitialState = {
  formValues: {},
};

const SignUpReducer = (state, action) => {
  switch (action.type) {
    case "TEXT_INPUT":
      return { ...state, ...action.payload };
  }
};

export default SignUpReducer;
