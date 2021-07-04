const Express = require("express");

const { User } = require("../models/Users");

module.exports = function (request, response, next) {
  const CheckisAdmin = User.findOne({ email: request.user.email });
  console.log(CheckisAdmin);
  if (!CheckisAdmin.schema.obj.isAdmin) {
    return response
      .status(403)
      .send("You are not allowed to do this operation");
  }
  next();
};
