import {
  DatePickerField,
  ImageSelectorField,
  PickerField,
  RadioButtonField,
  SelectMultipleField,
  TextField,
} from "./FormField-model";

import * as Yup from "yup";
import { addYears } from "date-fns";
import { fetchCategories } from "../../actions/fetch-categories";

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
  categories: Yup.object().required(),
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
  new TextField("email", { label: "Email" }),
  new TextField("password", { label: "Password", secureTextEntry: true }),
  new TextField("username", { label: "Username" }),
  new SelectMultipleField("categories", {
    label: "Categories",
    getOptions: fetchCategories,
    listStyle: { flexGrow: 0, height: 250 },
  }),
];

export const influencerSignUpForm = [
  new TextField("first_name", { label: "First Name" }),
  new TextField("last_name", { label: "Last Name" }),
  new DatePickerField("age", { label: "Birth Date" }),
];

export const businessSignUpForm = [
  new TextField("business_name", { label: "Business Name" }),
];
