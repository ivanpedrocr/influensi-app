export const signUpInitialState = {
  formValues: {
    age: new Date(),
    user_type: "",
    profileImage: { image: null, uploading: false },
  },
};

const SignUpReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FORM_VALUES":
      return {
        ...state,
        formValues: { ...state.formValues, ...action.payload },
      };
    case "SET_PROFILE_IMAGE":
      return {
        ...state,
        formValues: { ...state.formValues, profileImage: action.payload },
      };
  }
};

export default SignUpReducer;
