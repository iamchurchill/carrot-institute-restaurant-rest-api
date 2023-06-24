const Response = require("@classes/response");
const { sequelize, Order, OrderDetail } = require("@models");

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
 *               user_id:
 *                 type: string
 *                 description: User ID for order
 *               restaurant_id:
 *                 type: string
 *                 format: uuid
 *                 description: Restaurant ID for order
 *               address_id:
 *                 type: string
 *                 format: uuid
 *                 description: Address ID for user making the order
 *               total_amount:
 *                 type: float
 *                 example: 39.98
 *                 description: Total cost of order
 *               order_details:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     menu_id:
 *                       type: string
 *                       format: uuid
 *                     quantity:
 *                       type: integer
 *                       format: int32
 *                       example: 2
 *                     price:
 *                       type: number
 *                       format: float
 *                       example: 19.99
 *             required:
 *               - restaurant_id
 *               - address_id
 *               - total_amount
 *               - order_details
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
module.exports.store = async (request, response, next) => {
  let {
    user_id,
    restaurant_id,
    address_id,
    total_amount,
    status = "placed",
    order_details,
  } = request.body;

  user_id = user_id || request.user.id;

  const transaction = await sequelize.transaction();

  try {
    const order = await Order.create(
      {
        user_id,
        restaurant_id,
        address_id,
        order_date: new Date(),
        total_amount,
        status,
      },
      { transaction }
    );

    const orderDetailRecords = order_details.map((detail) => {
      return {
        order_id: order.id,
        menu_id: detail.menu_id,
        quantity: detail.quantity,
        price: detail.price,
      };
    });

    await OrderDetail.bulkCreate(orderDetailRecords, { transaction });

    await transaction.commit();

    return Response.success(response, {
      status: 201,
      message: "Order created successfully",
      data: order,
    });
  } catch (error) {
    await transaction.rollback();
    return next(error);
  }
};
