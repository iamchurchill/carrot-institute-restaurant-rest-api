const axios = require("axios");
const JWT = require("@classes/jwt");
const Response = require("@classes/response");
const { Sequelize, Token } = require("@models");

const { APP_URL, JWT_ISSUER, JWT_ACCESS_TOKEN_SECRET_KEY } = process.env;

//Verify app token
module.exports.verifyToken = (request, response, next) => {
  const access_token = request.token;

  return Token.findOne({
    attributes: ["token"],
    where: {
      token: {
        [Sequelize.Op.eq]: access_token,
      },
    },
  })
    .then((token) => {
      if (token) {
        return Response.error(response, {
          status: 401,
          message: "Token is invalid",
        });
      }
      const verifyJwt = new JWT(JWT_ACCESS_TOKEN_SECRET_KEY);
      return verifyJwt
        .verifyToken(access_token, {
          algorithm: "HS256",
          issuer: JWT_ISSUER,
          audience: APP_URL,
        })
        .then((user) => {
          if (!user) {
            return Response.error(response, {
              status: 401,
              message: "Token is invalid",
            });
          }
          request.user = user;
          return next();
        })
        .catch((error) => {
          return next(error);
        });
    })
    .catch((error) => {
      return next(error);
    });
};
