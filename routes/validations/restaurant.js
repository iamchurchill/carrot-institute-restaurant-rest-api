const { body, param, query } = require("express-validator");
const {
  validateDateOfBirth,
  validateLocation,
  validateMsisdn,
  validateRequestKeys,
} = require("@helpers/validator");

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
  body("username")
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .escape()
    .isString(),
  body("date_of_birth")
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .escape()
    .isDate({ strictMode: true, format: "YYYY-MM-DD", delimiters: ["-"] })
    .withMessage("Date of birth should be a valid date YYYY-MM-DD"),
  body("active")
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .escape()
    .isString()
    .isIn(["active", "inactive", "banned"])
    .withMessage("Active should be active, inactive or banned"),
  query("gender")
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .escape(),
  query("my_circle")
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .escape(),
  query("feedback")
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .escape(),
  query("interest")
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .escape(),
  query("circle")
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .escape(),
  query("notifications")
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .escape(),
  query("invitations")
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .escape(),
  query("requests")
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .escape(),
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
  query("gender")
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .escape(),
  query("my_circle")
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .escape(),
  query("feedback")
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .escape(),
  query("interest")
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .escape(),
  query("circle")
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .escape(),
  query("notifications")
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .escape(),
  query("invitations")
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .escape(),
  query("requests")
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .escape(),
];

module.exports.store = [
  body("username")
    .exists({ checkNull: true, checkFalsy: true })
    .notEmpty()
    .withMessage("Username is required")
    .trim()
    .escape()
    .isString(),
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
    )
    .custom(validateMsisdn),
  body("date_of_birth")
    .exists({ checkNull: true, checkFalsy: true })
    .notEmpty()
    .withMessage("Date of birth is required")
    .trim()
    .escape()
    .isDate({ format: "YYYY-MM-DD" })
    .withMessage("Invalid date of birth format (use YYYY-MM-DD)")
    .custom(validateDateOfBirth),
  body("gender_id")
    .exists({ checkNull: true, checkFalsy: true })
    .notEmpty()
    .withMessage("Gender ID is required")
    .trim()
    .escape()
    .isUUID()
    .withMessage("Gender ID is not a UUID"),
  body("firebase_messaging_id")
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .escape()
    .default(null),
  body("active")
    .exists({ checkNull: true, checkFalsy: true })
    .notEmpty()
    .withMessage("Status is required")
    .trim()
    .escape()
    .isString()
    .isIn(["active", "inactive", "banned"])
    .withMessage("Status should be active, inactive or banned")
    .default("active"),
  body("bio")
    .exists({ checkNull: true, checkFalsy: true })
    .notEmpty()
    .withMessage("Bio is required")
    .trim()
    .escape()
    .isString(),
  body("address")
    .exists({ checkNull: true, checkFalsy: true })
    .notEmpty()
    .withMessage("Address is required")
    .trim()
    .escape()
    .isString(),
  body("latitude")
    .exists({ checkNull: true, checkFalsy: true })
    .notEmpty()
    .withMessage("Latitude is required")
    .trim()
    .escape()
    .custom(validateLocation)
    .withMessage("Longitude and latitude must be valid"),
  body("longitude")
    .exists({ checkNull: true, checkFalsy: true })
    .notEmpty()
    .withMessage("Longitude is required")
    .trim()
    .escape()
    .custom(validateLocation)
    .withMessage("Longitude and latitude must be valid"),
  body("version_identifier")
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .escape()
    .isString(),
];

module.exports.update = [
  param("id")
    .exists({ checkNull: true, checkFalsy: true })
    .notEmpty()
    .withMessage("ID is required")
    .trim()
    .escape()
    .isUUID()
    .withMessage("ID is not a UUID"),
  body().custom(
    validateRequestKeys([
      "image",
      "username",
      "date_of_birth",
      "gender_id",
      "firebase_messaging_id",
      "active",
      "status",
      "bio",
      "address",
      "latitude",
      "longitude",
      "last_activity",
      "version_identifier",
    ])
  ),
  body("username")
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .escape()
    .isString(),
  body("date_of_birth")
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .escape()
    .isDate({ format: "YYYY-MM-DD" })
    .withMessage("Invalid date of birth format (use YYYY-MM-DD)")
    .custom(validateDateOfBirth),
  body("gender_id")
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .escape()
    .isUUID()
    .withMessage("Gender ID is not a UUID"),
  body("firebase_messaging_id")
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .escape()
    .isString(),
  body("active")
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .escape()
    .isString()
    .isIn(["active", "inactive", "banned"])
    .withMessage("Status should be active, inactive or banned")
    .default("active"),
  body("status")
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .escape()
    .isString(),
  body("bio")
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .escape()
    .isString(),
  body("address")
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .escape()
    .isString(),
  body("latitude")
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .escape()
    .bail()
    .custom(validateLocation)
    .withMessage("Longitude and latitude must be valid"),
  body("longitude")
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .escape()
    .bail()
    .custom(validateLocation)
    .withMessage("Longitude and latitude must be valid"),
  body("last_activity")
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .escape()
    .isDate()
    .withMessage("Last activity field must be a valid date"),
  body("version_identifier")
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .escape()
    .isString(),
];

module.exports.destroy = [
  param("id")
    .exists({ checkNull: true, checkFalsy: true })
    .notEmpty()
    .withMessage("ID is required")
    .trim()
    .escape()
    .isUUID()
    .withMessage("ID is not a UUID"),
];
