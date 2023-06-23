const crypto = require("crypto");

module.exports.token = crypto.randomBytes(256).toString("hex");
