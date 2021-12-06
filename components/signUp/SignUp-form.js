import {
  DatePickerField,
  PickerField,
  RadioButtonField,
  TextField,
} from "./FormField-model";

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
