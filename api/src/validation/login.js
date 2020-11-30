const validator = require("validator");

module.exports = function validateLoginForm(fields) {
  let errors = {};
  // Convert empty fields to an empty string so we can use validator functions
  fields = Object.entries(fields).reduce(
    (a, [k, v]) => (v ? ((a[k] = v), a) : ((a[k] = ""), a)),
    {}
  );

  // Validate Email Field
  if (validator.isEmpty(fields.email)) {
    errors.email = "Email field is required";
  } else if (!validator.isEmail(fields.email)) {
    errors.email = "Email is invalid";
  }
  // Check Password Field
  if (validator.isEmpty(fields.password)) {
    errors.password = "Password field is required";
  }
  return {
    errors,
    isValid: !errors.length ? true : false,
  };
};
