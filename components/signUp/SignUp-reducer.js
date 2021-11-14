export const signUpInitialState = {
  formValues: { age: new Date() },
};

const SignUpReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FORM_VALUES":
      return {
        ...state,
        formValues: { ...state.formValues, ...action.payload },
      };
  }
};

export default SignUpReducer;
