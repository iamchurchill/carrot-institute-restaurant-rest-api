const JWT = require("@classes/jwt");
const Response = require("@classes/response");
const { Sequelize, User, Token } = require("@models");
const bcrypt = require("bcrypt");
const {
  APP_URL,
  JWT_ISSUER,
  JWT_ACCESS_TOKEN_SECRET_KEY,
  JWT_REFRESH_TOKEN_SECRET_KEY,
  JWT_ACCESS_TOKEN_EXPIRES,
  JWT_REFRESH_TOKEN_EXPIRES,
} = process.env;

/**
 * @swagger
 * /api/v1/register:
 *   post:
 *     summary:
 *     description:
 *     tags:
 *       - AUTH
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               msisdn:
 *                 type: string
 *             example:
 *               msisdn: "+233545972039"
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *             example:
 *               status: true
 *               message: Verification code sent successfully
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *             example:
 *               status: false
 *               message: Verification code wasn't sent successfully
 */
module.exports.register = (request, response, next) => {
  const { email, password } = request.body;

  User.findOne({
    where: {
      email: {
        [Sequelize.Op.eq]: email,
      },
    },
  })
    .then((user) => {
      if (user) {
        return response.status(400).json(errorResponse("User already exist"));
      }
      return bcrypt
        .hash(password, 10)
        .then((encryptedPassword) => {
          return User.create({
            email: email.toLowerCase(),
            password: encryptedPassword,
          })
            .then((user) => {
              return response
                .status(201)
                .json(successResponse("Registered successfully", user));
            })
            .catch((error) => {
              return next(error);
            });
        })
        .catch((error) => {
          return next(error);
        });
    })
    .catch((error) => {
      return next(error);
    });
};

/**
 * @swagger
 * /api/v1/login:
 *   post:
 *     summary:
 *     description:
 *     tags:
 *       - AUTH
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               msisdn:
 *                 type: string
 *             example:
 *               msisdn: "+233545972039"
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *             example:
 *               status: true
 *               message: Verification code sent successfully
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *             example:
 *               status: false
 *               message: Verification code wasn't sent successfully
 */
module.exports.login = (request, response, next) => {
  const { email, password } = request.body;

  User.findOne({
    where: {
      email: {
        [Sequelize.Op.eq]: email,
      },
    },
  })
    .then((user) => {
      if (!user) {
        return response.status(400).json(errorResponse("User not found"));
      }
      return bcrypt
        .compare(password, user.password)
        .then((matches) => {
          if (!matches) {
            return response
              .status(400)
              .json(errorResponse("Invalid Credentials"));
          }
          const accessToken = getToken(user, false);
          const refreshToken = getToken(user);

          return response
            .status(200)
            .json(
              successResponse(
                "Logged in successfully",
                user,
                accessToken,
                refreshToken
              )
            );
        })
        .catch((error) => {
          return next(error);
        });
    })
    .catch((error) => {
      return next(error);
    });
};

/**
 * @swagger
 * /api/v1/logout:
 *   post:
 *     summary: Logout user
 *     description: This endpoint should be used to log out user from system.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - AUTH
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *             example:
 *               status: true
 *               message: Logged out successfully
 *       401:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *             example:
 *               status: false
 *               message: Token is invalid
 *       502:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *             example:
 *               status: false
 *               message: Logged out unsuccessful
 */
module.exports.logout = (request, response, next) => {
  const token = request.token;

  const verifyJwt = new JWT(JWT_ACCESS_TOKEN_SECRET_KEY);
  return verifyJwt
    .verifyToken(token, {
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
      return Token.create({
        user_id: user.id,
        token: token,
        expires: new Date(user.exp * 1000),
      })
        .then((token) => {
          if (!token) {
            return Response.error(response, {
              status: 502,
              message: "Logged out unsuccessful",
            });
          }
          return Response.success(response, {
            message: "Logged out successfully",
          });
        })
        .catch((error) => {
          return next(error);
        });
    })
    .catch((error) => {
      return next(error);
    });
};
