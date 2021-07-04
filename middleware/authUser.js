const jwt = require("jsonwebtoken");
const Express = require("express");

module.exports = function (request, response, next) {
  const token = request.header("x-auth-token");
  if (!token)
    return response
      .status(401)
      .send("Token missing..Try again after logging in");
  try {
    const VerifyToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    request.user = VerifyToken;
    next();
  } catch (error) {
    response.status(401).send("Invalid Token");
  }
};
