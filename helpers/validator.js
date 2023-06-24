const fs = require("fs");
const { Sequelize, User } = require("@models");
const Response = require("@classes/response");
const { validationResult } = require("express-validator");

module.exports.requestValidator = (validations) => {
  return async (request, response, next) => {
    try {
      await Promise.all(
        validations.map(async (validation) => await validation.run(request))
      );
      const errors = validationResult(request);
      if (errors.isEmpty()) {
        return next();
      }
      if (request.file) {
        await fs.promises.unlink(request.file.path);
      }
      return Response.error(response, {
        status: 422,
        message:
          "The request is invalid. Please check the parameters and try again.",
        errors: errors.array(),
      });
    } catch (error) {
      return Response.error(response, {
        status: 500,
        message: error.message,
      });
    }
  };
};

module.exports.validateEmail = (value) => {
  return User.findOne({
    attributes: ["email"],
    where: {
      email: {
        [Sequelize.Op.eq]: value,
      },
    },
  })
    .then((user) => {
      if (user) {
        return Promise.reject("Email address is taken!");
      }
    })
    .catch((error) => {
      return Promise.reject(error.toString());
    });
};
