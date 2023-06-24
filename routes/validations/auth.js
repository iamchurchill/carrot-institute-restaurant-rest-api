const { body } = require("express-validator");
const { validateEmail } = require("@helpers/validator");

module.exports.register = [
  body("email")
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage("Email is required")
    .normalizeEmail({
      all_lowercase: false,
      gmail_remove_dots: false,
      gmail_remove_subaddress: false,
    })
    .isEmail()
    .trim()
    .escape()
    .custom(validateEmail),
  body("password")
    .exists({ checkNull: true, checkFalsy: true })
    .notEmpty()
    .withMessage("Password is required")
    .trim()
    .escape()
    .isString()
    .isStrongPassword({
      minLength: 8,
      minUppercase: 1,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      "Password should be greater than 8 and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
  body(
    "password_confirm",
    "Your confirmation password must match the password field"
  )
    .exists({ checkNull: true, checkFalsy: true })
    .notEmpty()
    .withMessage("Confirmation password is required")
    .trim()
    .escape()
    .isString()
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Confirmation password should match password"),
];

module.exports.login = [
  body("email")
    .exists({ checkNull: true, checkFalsy: true })
    .trim()
    .escape()
    .isString(),
  body("password")
    .exists({ checkNull: true, checkFalsy: true })
    .trim()
    .escape()
    .isString(),
];
