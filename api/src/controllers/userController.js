const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/local");

// Load Form validations
const validateRegisterForm = require("../validation/register");
const validateLoginForm = require("../validation/login");
// Load User model
const User = require("../db/models/User");

/**
 * Login function
 * @param {*} req
 * @param {*} res
 */
const login = (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginForm(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  // Find user by email
  User.findOne({ email }).then((user) => {
    // Check if email exists
    if (!user) {
      return res
        .status(404)
        .json({ emailnotfound: "Email not registered with us" });
    }
    // Check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name,
        };
        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 259200, // 3 days
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Incorrect password" });
      }
    });
  });
};

/**
 * Register function
 * @param {*} req
 * @param {*} res
 */
const register = (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterForm(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then((user) => {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    // Hash password before saving in database
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser
          .save()
          .then((user) => res.json(user))
          .catch((err) => console.log(err));
      });
    });
  });
};
module.exports = { login, register };
