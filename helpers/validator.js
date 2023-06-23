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

module.exports.validateRequestKeys = (allowedKeys) => {
  return (value, { req }) => {
    const keys = Object.keys(req.body);
    const invalidKeys = keys.filter((key) => !allowedKeys.includes(key));
    if (invalidKeys.length) {
      throw new Error(`Invalid keys: ${invalidKeys.join(", ")}`);
    }
    return true;
  };
};

module.exports.validateDateOfBirth = (value, { req }) => {
  return new Promise((resolve, reject) => {
    try {
      const dob = new Date(value);
      const eighteenYearsAgo = new Date(
        new Date().getFullYear() - 18,
        new Date().getMonth(),
        new Date().getDate()
      );
      if (dob > eighteenYearsAgo) {
        reject(
          new Error(
            "You must be at least 18 years old as of " +
              eighteenYearsAgo.toLocaleDateString()
          )
        );
      } else {
        resolve();
      }
    } catch (error) {
      reject(new Error("Invalid date of birth"));
    }
  });
};

module.exports.validateMsisdn = (value) => {
  return User.findOne({
    attributes: ["msisdn"],
    where: {
      msisdn: {
        [Sequelize.Op.eq]: value,
      },
    },
  })
    .then((user) => {
      if (user) {
        return Promise.reject("MSISDN is taken");
      }
    })
    .catch((error) => {
      return Promise.reject(error.toString());
    });
};
