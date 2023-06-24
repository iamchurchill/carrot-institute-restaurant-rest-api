const Response = require("@classes/response");
const { Order, OrderDetails } = require("@models");
const { PER_PAGE } = process.env;

/**
 * @swagger
 * /api/v1/order:
 *   post:
 *     summary: Add new order
 *     description: This endpoint enables users to add new order to the system.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - ORDERS
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of order
 *               user_id:
 *                 type: string
 *                 format: uuid
 *                 description: User ID of order
 *               address_id:
 *                 type: string
 *                 format: uuid
 *                 description: Address ID of order
 *               msisdn:
 *                 type: string
 *                 description: MSISDN of order
 *               email:
 *                 type: string
 *                 description: Email of order
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
 *               message: Order created successfully
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

  Order.create({
    name,
    user_id,
    address_id,
    msisdn,
    email,
  })
    .then((order) => {
      if (!order) {
        return Response.error(response, {
          status: 500,
          message: "Order not saved",
        });
      }
      return Response.success(response, {
        status: 201,
        message: "Order created successfully",
        data: order,
      });
    })
    .catch((error) => {
      return next(error);
    });
};
