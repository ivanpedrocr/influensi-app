import React from "react";
import { View } from "react-native";
import BasicForm from "../BasicForm";
import {
  influencerSignUpForm,
  influencerValidationSchema,
} from "./SignUp-form";

const InfluencerSignUpView = ({ control }) => {
  return <BasicForm control={control} formMap={influencerSignUpForm} />;
};

export default InfluencerSignUpView;
