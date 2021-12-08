import React from "react";
import { View } from "react-native";
import BasicForm from "../BasicForm";
import { businessSignUpForm } from "./SignUp-form";

const BusinessSignUpView = ({ control }) => {
  return (
    <BasicForm
      formMap={businessSignUpForm}
      control={control}
      style={{ marginBottom: 8 }}
    />
  );
};

export default BusinessSignUpView;
