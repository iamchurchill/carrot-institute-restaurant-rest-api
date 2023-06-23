const Response = require("@classes/response");

module.exports.accept = (request, response, next) => {
  const acceptHeader = request.headers.accept;
  if (!acceptHeader || acceptHeader !== "application/json") {
    return Response.error(response, { status: 406, message: "Not Acceptable" });
  }
  return next();
};

module.exports.token = (request, response, next) => {
  const authorizationHeader = request.headers.authorization;
  if (!authorizationHeader) {
    return Response.error(response, {
      status: 401,
      message: "Authorization header is missing",
    });
  }
  const token = authorizationHeader.split(" ")[1];
  if (!token) {
    return Response.error(response, {
      status: 401,
      message: "No token in your request",
    });
  }
  request.token = token;
  return next();
};
