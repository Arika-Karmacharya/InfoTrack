import {
  EmailRegexValidaion,
  passwordRegexValidation,
} from "./regex";
import isEmpty from "./isEmpty";

export const InputValidator = async (document, validationFields) => {
  const errors = {};
  let fields = Object.keys(validationFields).map(function(key) {
    return { id: key, value: validationFields[key] };
  });

  if (fields) {
    Promise.all(
      fields.map(async (field) => {
        const getElementById = document.getElementById(field.id);

        let validators =
          getElementById && getElementById.getAttribute("validators");
        const conditions = validators ? validators.split(",") : null;

        if (conditions) {
          Promise.all(
            conditions.map((condition) => {
              const errMsg = validationConditions(condition, field.value);
              if (errMsg) {
                errors[field.id] = errMsg;
              }
            })
          );
        }
      })
    );
  }
  return errors;
};

const validationConditions = (condition, value) => {
  switch (condition) {
    case "required": {
      return !value || isEmpty(value) ? "Required" : "";
    }

    case "email": {
      const isValid = !isEmpty(value) ? EmailRegexValidaion(value) : true;
      return !isValid ? "Invalid Email" : "";
      }

    case "password": {
      const isValid = !isEmpty(value) ? passwordRegexValidation(value) : true;
      return !isValid
        ? " Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
        : "";
    }
    default:
      return "";
  }
};
