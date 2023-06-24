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
 *     summary: Register user
 *     description: This endpoint should be used to register user
 *     tags:
 *       - AUTH
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 default: "churchillmerediths@gmail.com"
 *                 example: "churchillmerediths@gmail.com"
 *                 description:
 *               password:
 *                 type: string
 *                 default: "admin"
 *                 example: "admin"
 *                 description:
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
 *               message: Registered successfully
 *       400:
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
 *               message: User already exists
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
 *               message: Internal Server Error
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
        return Response.error(response, {
          status: 400,
          message: "User already exists",
        });
      }
      return bcrypt
        .hash(password, 10)
        .then((hashedPassword) => {
          return User.create({
            email: email.toLowerCase(),
            password: hashedPassword,
          })
            .then((user) => {
              return Response.success(response, {
                status: 201,
                message: "Registered successfully",
                data: user,
              });
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
 *     summary: Login user
 *     description: This endpoint should be used to log in users
 *     tags:
 *       - AUTH
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 default: "churchillmerediths@gmail.com"
 *                 example: "churchillmerediths@gmail.com"
 *                 description:
 *               password:
 *                 type: string
 *                 default: "admin"
 *                 example: "admin"
 *                 description:
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
 *                 data:
 *                   type: object
 *                 access_token:
 *                   type: string
 *                 refresh_token:
 *                   type: string
 *             example:
 *               status: true
 *               message: Logged in successfully
 *               data:
 *               access_token:
 *               refresh_token:
 *       400:
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
 *               message: User not found
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
 *               message: Internal Server Error
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
        return Response.error(response, {
          status: 400,
          message: "User not found",
        });
      }

      const payload = {
        id: user.id,
        email: user.email,
        msisdn: user.msisdn,
        type: user.type,
      };

      const options = {
        algorithm: "HS256",
        issuer: JWT_ISSUER,
        audience: APP_URL,
      };

      const accessJwt = new JWT(JWT_ACCESS_TOKEN_SECRET_KEY, options);
      const refreshJwt = new JWT(JWT_REFRESH_TOKEN_SECRET_KEY, options);

      return bcrypt
        .compare(password, user.password)
        .then((matches) => {
          if (!matches) {
            return Response.error(response, {
              status: 400,
              message: "Invalid Credentials",
            });
          }

          Promise.all([
            accessJwt.getToken(payload, {
              expiresIn: JWT_ACCESS_TOKEN_EXPIRES,
            }),
            refreshJwt.getToken(payload, {
              expiresIn: JWT_REFRESH_TOKEN_EXPIRES,
            }),
          ])
            .then(([access_token, refresh_token]) => {
              if (!access_token || !refresh_token) {
                return Response.error(response, {
                  status: 500,
                  message: "Error creating token",
                });
              }
              return Response.success(response, {
                message: "Logged in successfully",
                data: user,
                access_token,
                refresh_token,
              });
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
 * /api/v1/logout:
 *   post:
 *     summary: Logout user
 *     description: This endpoint should be used to log out users
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
 *       400:
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
          status: 400,
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
              status: 500,
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
