const { body } = require("express-validator");

module.exports.register = [
  body("msisdn")
    .exists({ checkNull: true, checkFalsy: true })
    .notEmpty()
    .withMessage("MSISDN is required")
    .trim()
    .escape()
    .isString()
    .matches(/^\+[1-9]\d{1,14}$/)
    .withMessage(
      "MSISDN must be in E.164 format (+[country code][number]), e.g. +233545923049"
    ),
];

module.exports.login = [
  body("msisdn")
    .exists({ checkNull: true, checkFalsy: true })
    .notEmpty()
    .withMessage("MSISDN is required")
    .trim()
    .escape()
    .isString()
    .matches(/^\+[1-9]\d{1,14}$/)
    .withMessage(
      "MSISDN must be in E.164 format (+[country code][number]), e.g. +233545923049"
    ),
  body("code")
    .exists({ checkNull: true, checkFalsy: true })
    .notEmpty()
    .withMessage("Code is required")
    .trim()
    .escape()
    .isInt(),
];
