const express = require("express");
const { signup, signin } = require("../controllers/authController");
const { body } = require("express-validator");

const router = express.Router();

router.post(
  "/signup",
  [
    body("name", "Name must have minimum length of 4 characters").isLength({
      min: 4,
    }),
    body("name", "Name must containe only alphabets and no space").isAlpha(),
    body("email", "Please enter a valid email").isEmail(),
    body("role", "Role must be of type numeric").isNumeric(),
    body("password", "Password must contain minimum 6 characters").isLength({
      min: 6,
    }),
  ],
  signup
);

router.post(
  "/signin",
  [
    body("email", "Please enter a valid email").isEmail(),
    body("password", "Password must contain minimum 6 characters").isLength({
      min: 6,
    }),
  ],
  signin
);

module.exports = router;
