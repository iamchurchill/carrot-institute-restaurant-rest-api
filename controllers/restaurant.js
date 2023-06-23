const Response = require("@classes/response");
const { Sequelize, sequelize, Restaurant } = require("@models");
const Pagination = require("@classes/pagination");
const Util = require("@classes/util");
const { PER_PAGE } = process.env;

/**
 * @swagger
 * /api/v1/gender:
 *   get:
 *     summary: List all restaurant
 *     description: This endpoint should be used to retrieve a list of restaurant with pagination and optional filtering.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - RESTAURANT
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         required: false
 *         description: Page number for paginated results
 *       - in: query
 *         name: per_page
 *         schema:
 *           type: integer
 *           minimum: 10
 *           maximum: 100
 *         required: false
 *         description: Number of results to return per page (10-100)
 *       - in: query
 *         name: users
 *         schema:
 *           type: string
 *           example: "false"
 *           default: "false"
 *         required: false
 *         description:
 *       - in: query
 *         name: circles
 *         schema:
 *           type: string
 *           example: "false"
 *           default: "false"
 *         required: false
 *         description:
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
 *               message: Restaurants retrieved successfully
 *       401:
 *         description: Unauthorized
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
 *               message: Authorization header is missing
 *       404:
 *         description: Not Found
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
 *               message: No gender found
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
 *               message:
 */
module.exports.index = (request, response, next) => {
  const {
    page = 1,
    per_page = PER_PAGE,
    users = "false",
    circles = "false",
  } = request.query;

  const includes = [];
  if (users === "true") {
    includes.push({
      model: sequelize.models.User,
      as: "users",
    });
  }

  if (circles === "true") {
    includes.push({
      model: sequelize.models.Circle,
      as: "circles",
    });
  }

  const pagination = new Pagination(Restaurant, {
    include: includes,
    page: page,
    perPage: per_page,
    baseUrl: Util.getUrl(),
  });

  pagination
    .paginate()
    .then((restaurant) => {
      if (restaurant.results.length === 0) {
        return Response.error(response, {
          status: 404,
          message: "No restaurant found",
        });
      }
      return Response.success(response, {
        message: "Restaurants retrieved successfully",
        data: restaurant,
      });
    })
    .catch((error) => {
      return next(error);
    });
};

/**
 * @swagger
 * /api/v1/restaurant/{id}:
 *   get:
 *     summary: List restaurant by ID
 *     description: This endpoint should be used to retrieve restaurant by its ID.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - GENDERS
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID of the restaurant (UUID format)
 *       - in: query
 *         name: users
 *         schema:
 *           type: string
 *           example: "false"
 *           default: "false"
 *         required: false
 *         description:
 *       - in: query
 *         name: circles
 *         schema:
 *           type: string
 *           example: "false"
 *           default: "false"
 *         required: false
 *         description:
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
 *               message: Restaurant retrieved successfully
 *       401:
 *         description: Unauthorized
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
 *               message: Authorization header is missing
 *       404:
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
 *               message: No restaurant available
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
 *               message:
 */
module.exports.show = (request, response, next) => {
  const { id } = request.params;
  const { users = "false", circles = "false" } = request.query;

  const includes = [];
  if (users === "true") {
    includes.push({
      model: sequelize.models.User,
      as: "users",
    });
  }

  if (circles === "true") {
    includes.push({
      model: sequelize.models.Circle,
      as: "circles",
    });
  }

  Restaurant.findByPk(id, {
    include: includes,
  })
    .then((restaurant) => {
      if (!restaurant) {
        return Response.error(response, {
          status: 404,
          message: "No restaurant available",
        });
      }
      return Response.success(response, {
        message: "Restaurant retrieved successfully",
        data: restaurant,
      });
    })
    .catch((error) => {
      return next(error);
    });
};

/**
 * @swagger
 * /api/v1/restaurant:
 *   post:
 *     summary: Add new restaurant
 *     description: This endpoint enables users to add new restaurant to the system.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - GENDERS
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of restaurant e.t.c Male or Female
 *     responses:
 *       201:
 *         description: Created
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
 *               message: Restaurant created successfully
 *       401:
 *         description: Unauthorized
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
 *               message: Authorization header is missing
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
 *               message:
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
 *               message: User not saved
 */
module.exports.store = (request, response, next) => {
  const { name } = request.body;

  Restaurant.create({
    name,
  })
    .then((restaurant) => {
      if (!restaurant) {
        return Response.error(response, {
          status: 502,
          message: "Restaurant not saved",
        });
      }
      return Response.success(response, {
        status: 201,
        message: "Restaurant created successfully",
        data: restaurant,
      });
    })
    .catch((error) => {
      return next(error);
    });
};
