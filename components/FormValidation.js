import { getAge } from "../utils/getBirthDate";

const validateField = (field, validationSchema) => {
  const validationField = validationSchema[field.name];
  const validationMethods = Object.keys(validationSchema[field.name]);
  validationMethods.map((method) => {
    const validationValue = validationField[method];
    switch (method) {
      case "min_length":
        return field.value.length >= validationValue;
      case "match":
        return field.value.match(validationValue);
      case "min_age":
        return getAge(field.value) >= validationValue;
    }
  });
};
