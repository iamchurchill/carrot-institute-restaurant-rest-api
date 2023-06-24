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
  body("username")
    .exists({ checkNull: true, checkFalsy: true })
    .notEmpty()
    .withMessage("Username is required")
    .trim()
    .escape()
    .isString(),
];
