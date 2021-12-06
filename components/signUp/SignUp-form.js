import {
  DatePickerField,
  PickerField,
  RadioButtonField,
  TextField,
} from "./FormField-model";

import * as Yup from "yup";

export const signUpForm = [
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
  new TextField("username", { placeholder: "username" }),
  new DatePickerField("age", {}),
  new TextField("first_name", { placeholder: "First Name" }),
  new TextField("last_name", { placeholder: "Last Name" }),
];

export const validationSchema = Yup.object({
  first_name: Yup.string().required("Required"),
  last_name: Yup.string().required("Required"),
  password: Yup.string().min(8).required(),
  email: Yup.string().email().required(),
  user_type: Yup.string().required("Required"),
});
