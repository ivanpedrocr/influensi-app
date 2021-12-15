import {
  DatePickerField,
  ImageSelectorField,
  PickerField,
  RadioButtonField,
  TextField,
} from "./FormField-model";

import * as Yup from "yup";
import { addYears } from "date-fns";

const minDate = addYears(new Date(), -13);

const influencerRequiredField = (requiredText) => ({
  is: (val) => val === "INFLUENCER",
  then: Yup.string().required(requiredText),
});

export const influencerValidationSchema = {
  first_name: Yup.string().when(
    "user_type",
    influencerRequiredField("Required")
  ),
  last_name: Yup.string().when(
    "user_type",
    influencerRequiredField("Required")
  ),
  age: Yup.date().when("user_type", {
    is: (val) => val === "INFLUENCER",
    then: Yup.date()
      .max(minDate, "Minimum age must be 13 years old.")
      .required("Required"),
  }),
};

export const businessValidationSchema = {
  business_name: Yup.string().when("user_type", {
    is: (val) => val === "BUSINESS",
    then: Yup.string().required("Business Name is required"),
  }),
  business_category: Yup.string(),
};

export const validationSchema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().min(8).required(),
  username: Yup.string().min(5).required("Username is required"),
  user_type: Yup.string().required("Required"),
  avatar: Yup.string().required("A Profile Image is required."),
  ...influencerValidationSchema,
  ...businessValidationSchema,
});

export const signUpForm = [
  new ImageSelectorField("avatar", {}),
  new RadioButtonField("user_type", {
    options: [
      {
        label: "Business",
        item: "BUSINESS",
      },
      { label: "Influencer", item: "INFLUENCER" },
    ],
  }),
  new TextField("email", { placeholder: "Email" }),
  new TextField("password", { placeholder: "Password", secureTextEntry: true }),
  new TextField("username", { placeholder: "Username" }),
];

export const influencerSignUpForm = [
  new TextField("first_name", { placeholder: "First Name" }),
  new TextField("last_name", { placeholder: "Last Name" }),
  new DatePickerField("age", { label: "Birth Date" }),
];

export const businessSignUpForm = [
  new TextField("business_name", { placeholder: "Business Name" }),
];
