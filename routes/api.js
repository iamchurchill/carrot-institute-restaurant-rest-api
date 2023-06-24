//CONTROLLERS
const restaurantController = require("@controllers/restaurant");
const orderController = require("@controllers/order");
const authController = require("@controllers/auth");

//HEADERS MIDDLEWARE
const { accept, token } = require("@middlewares/headers");
const { verifyToken, verifyAccountType } = require("@middlewares/auth");

//VALIDATOR HELPERS
const { requestValidator } = require("@helpers/validator");

//VALIDATIONS
const restaurantValidations = require("@validations/restaurant");
const orderValidations = require("@validations/order");
const authValidations = require("@validations/auth");

//ROUTER
const router = require("express").Router();

//ACCEPT
router.use(accept);

//AUTH
router
  .route("/register")
  .post(requestValidator(authValidations.register), authController.register);
router
  .route("/login")
  .post(requestValidator(authValidations.login), authController.login);
router.route("/logout").post(token, authController.logout);

//RESTAURANT
router
  .route("/restaurant")
  .get(
    token,
    verifyToken,
    requestValidator(restaurantValidations.index),
    restaurantController.index
  );
router
  .route("/restaurant/:id")
  .get(
    token,
    verifyToken,
    requestValidator(restaurantValidations.show),
    restaurantController.show
  );
router
  .route("/restaurant")
  .post(
    token,
    verifyToken,
    verifyAccountType,
    requestValidator(restaurantValidations.store),
    restaurantController.store
  );
router
  .route("/restaurant/:id/menu")
  .get(
    token,
    verifyToken,
    requestValidator(restaurantValidations.restaurant_menu),
    restaurantController.restaurant_menu
  );
router
  .route("/restaurant/:id/menu/:menu_id")
  .get(
    token,
    verifyToken,
    requestValidator(restaurantValidations.restaurant_menu_by_id),
    restaurantController.restaurant_menu_by_id
  );

//ORDER
router
  .route("/order")
  .post(
    token,
    verifyToken,
    requestValidator(orderValidations.store),
    orderController.store
  );
module.exports = router;
