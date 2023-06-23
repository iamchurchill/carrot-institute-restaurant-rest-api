const Response = require("@classes/response");

/**
 * @swagger
 * /:
 *   get:
 *     summary: Welcome page
 *     description: This endpoint returns a welcome message.
 *     tags:
 *       - HOME
 *     produces:
 *       - application/json
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
 *               message: Welcome to circles
 */
module.exports.index = (request, response) => {
  return Response.success(response, {
    message: "Welcome to Carrot Institute RESTFul API",
  });
};
