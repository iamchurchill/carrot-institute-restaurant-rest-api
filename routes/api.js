const path = require("path");
const FileUploader = require("@classes/file-uploader");

//CONTROLLERS
const restaurantController = require("@controllers/restaurant");
const authController = require("@controllers/auth");

//HEADERS MIDDLEWARE
const { accept, token } = require("@middlewares/headers");
const { verifyToken } = require("@middlewares/auth");

//VALIDATOR HELPERS
const { requestValidator } = require("@helpers/validator");

//VALIDATIONS
const restaurantValidations = require("@validations/restaurant");
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
    requestValidator(restaurantValidations.store),
    restaurantController.store
  );
