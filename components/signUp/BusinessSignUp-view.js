import React from "react";
import { View } from "react-native";
import BasicForm from "../BasicForm";
import { businessSignUpForm, businessValidationSchema } from "./SignUp-form";

const BusinessSignUpView = ({ control }) => {
  return <BasicForm formMap={businessSignUpForm} control={control} />;
};

export default BusinessSignUpView;
