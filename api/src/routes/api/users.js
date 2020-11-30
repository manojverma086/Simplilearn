const express = require("express");
const router = express.Router();
const { login, register } = require("../../controllers/userController");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", register);

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", login);

module.exports = router;
