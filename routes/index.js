//Controllers
const indexController = require("@controllers/index");

//Router
const router = require("express").Router();

//Index
router.route("/").get(indexController.index);

module.exports = router;
