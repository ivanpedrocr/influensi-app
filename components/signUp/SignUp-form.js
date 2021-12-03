import {
  DatePickerField,
  PickerField,
  RadioButtonField,
  TextField,
} from "./FormField-model";

export const signUpForm = [
  new TextField("email", { placeholder: "Email" }),
  new TextField("password", { placeholder: "Password", secureTextEntry: true }),
  new DatePickerField("age", {}),
  new TextField("username", { placeholder: "username" }),
  new TextField("first_name", { placeholder: "First Name" }),
  new TextField("last_name", { placeholder: "Last Name" }),
  new RadioButtonField("user_type", {
    options: [
      {
        label: "Business",
        value: "BUSINESS",
      },
      { label: "Influencer", value: "INFLUENCER" },
    ],
  }),
];
