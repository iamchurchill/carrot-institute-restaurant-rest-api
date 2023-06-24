const { body, param, query } = require("express-validator");

module.exports.index = [
  query("page")
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .escape()
    .isInt({ min: 1 })
    .withMessage("Page must be greater than zero"),
  query("per_page")
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .escape()
    .isInt({ min: 10, max: 100 })
    .withMessage("Per page must be an integer between 10 and 100"),
];

module.exports.show = [
  param("id")
    .exists({ checkNull: true, checkFalsy: true })
    .notEmpty()
    .withMessage("ID is required")
    .trim()
    .escape()
    .isUUID()
    .withMessage("ID is not a UUID"),
];

module.exports.store = [
  body("name")
    .exists({ checkNull: true, checkFalsy: true })
    .notEmpty()
    .withMessage("Name is required")
    .trim()
    .escape()
    .isString(),
  body("user_id")
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .escape()
    .isUUID(),
  body("address_id")
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .escape()
    .isUUID(),
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
    .escape(),
];

module.exports.restaurant_menu = [
  param("id")
    .exists({ checkNull: true, checkFalsy: true })
    .notEmpty()
    .withMessage("ID is required")
    .trim()
    .escape()
    .isUUID()
    .withMessage("ID is not a UUID"),
];

module.exports.restaurant_menu_by_id = [
  param("id")
    .exists({ checkNull: true, checkFalsy: true })
    .notEmpty()
    .withMessage("ID is required")
    .trim()
    .escape()
    .isUUID()
    .withMessage("ID is not a UUID"),
  param("menu_id")
    .exists({ checkNull: true, checkFalsy: true })
    .notEmpty()
    .withMessage("ID is required")
    .trim()
    .escape()
    .isUUID()
    .withMessage("Menu ID is not a UUID"),
];
