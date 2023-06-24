const Response = require("@classes/response");
const { Restaurant } = require("@models");
const Pagination = require("@classes/pagination");
const Util = require("@classes/util");
const { PER_PAGE } = process.env;

/**
 * @swagger
 * /api/v1/restaurant:
 *   get:
 *     summary: List all restaurant
 *     description: This endpoint should be used to retrieve a list of restaurant with pagination and optional filtering.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - RESTAURANTS
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
 *               data:
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
 *               message: Bad Request
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
 *               message: No restaurant found
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
module.exports.index = (request, response, next) => {
  const { page = 1, per_page = PER_PAGE } = request.query;

  const pagination = new Pagination(Restaurant, {
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
 *       - RESTAURANTS
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID of the restaurant (UUID format)
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
 *               data:
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
 *               message: Bad Request
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
 *               message: Internal Server Error
 */
module.exports.show = (request, response, next) => {
  const { id } = request.params;

  Restaurant.findByPk(id)
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
 *       - RESTAURANTS
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of restaurant
 *               user_id:
 *                 type: string
 *                 format: uuid
 *                 description: User ID of restaurant
 *               address_id:
 *                 type: string
 *                 format: uuid
 *                 description: Address ID of restaurant
 *               msisdn:
 *                 type: string
 *                 description: MSISDN of restaurant
 *               email:
 *                 type: string
 *                 description: Email of restaurant
 *             required:
 *               - name
 *               - msisdn
 *               - email
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
 *               data:
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
 *               message: Bad Request
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
module.exports.store = (request, response, next) => {
  let { name, user_id, address_id = null, msisdn, email } = request.body;

  user_id = user_id || request.user.id;

  Restaurant.create({
    name,
    user_id,
    address_id,
    msisdn,
    email,
  })
    .then((restaurant) => {
      if (!restaurant) {
        return Response.error(response, {
          status: 500,
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

/**
 * @swagger
 * /api/v1/restaurant/{id}/menu:
 *   get:
 *     summary: List restaurant menu by restaurant ID
 *     description: This endpoint should be used to retrieve restaurant menu by its ID.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - RESTAURANTS
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID of the restaurant (UUID format)
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
 *               data:
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
 *               message: Bad Request
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
 *               message: Internal Server Error
 */
module.exports.restaurant_menu = (request, response, next) => {
  const { id } = request.params;

  Restaurant.findByPk(id)
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
 * /api/v1/restaurant/{id}/menu/{menu_id}:
 *   get:
 *     summary: List restaurant by ID
 *     description: This endpoint should be used to retrieve restaurant by its ID.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - RESTAURANTS
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID of the restaurant (UUID format)
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
 *               data:
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
 *               message: Bad Request
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
 *               message: Internal Server Error
 */
module.exports.restaurant_menu_by_id = (request, response, next) => {
  const { id } = request.params;

  Restaurant.findByPk(id)
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
