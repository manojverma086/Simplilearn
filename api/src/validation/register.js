const validator = require("validator");
module.exports = function validateRegisterForm(fields) {
  let errors = {};
  // Convert empty fields to an empty string so we can use validator functions
  fields = Object.entries(fields).reduce(
    (a, [k, v]) => (v ? ((a[k] = v), a) : ((a[k] = ""), a)),
    {}
  );
  // Validate Name Field
  if (validator.isEmpty(fields.name)) {
    errors.name = "Name field is required";
  }
  // Validate Email Field
  if (validator.isEmpty(fields.email)) {
    errors.email = "Email field is required";
  } else if (!validator.isEmail(fields.email)) {
    errors.email = "Email is invalid";
  }
  // Check password and confirm password
  if (validator.isEmpty(fields.password)) {
    errors.password = "Password field is required";
  }
  if (validator.isEmpty(fields.password2)) {
    errors.password2 = "Confirm password field is required";
  }
  if (!validator.isLength(fields.password, { min: 4, max: 15 })) {
    errors.password = "Password must be at least 4 characters";
  }
  if (!validator.equals(fields.password, fields.password2)) {
    errors.password2 = "Passwords must match";
  }
  return {
    errors,
    isValid: !errors.length ? true : false,
  };
};
