const { body, param, query } = require("express-validator");

module.exports.store = [
  body("user_id")
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .escape()
    .isUUID(),
  body("restaurant_id")
    .exists({ checkNull: true, checkFalsy: true })
    .notEmpty()
    .withMessage("Restaurant ID is required")
    .trim()
    .escape()
    .isString()
    .isUUID(),
  body("address_id")
    .exists({ checkNull: true, checkFalsy: true })
    .notEmpty()
    .withMessage("Address ID is required")
    .trim()
    .escape()
    .isString()
    .isUUID(),
  body("total_amount")
    .exists({ checkNull: true, checkFalsy: true })
    .notEmpty()
    .withMessage("Total Amount is required")
    .trim()
    .escape()
    .isFloat(),
  body("order_details").isArray().withMessage("Order Details must be an array"),
  body("order_details.*.menu_id")
    .isUUID()
    .withMessage("Each Menu ID must be a positive integer"),
  body("order_details.*.quantity")
    .isInt({ gt: 0 })
    .withMessage("Each Quantity must be a positive integer"),
  body("order_details.*.price")
    .isFloat({ gt: 0 })
    .withMessage("Each Price must be a positive number"),
];
