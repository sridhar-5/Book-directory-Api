const { User, validateUser } = require("../models/Users");
const joi = require("Joi");
const mongoose = require("mongoose");
const _ = require("lodash");
const bcrypt = require("bcrypt");

const Express = require("express");
const { response } = require("express");
const router = Express.Router();

router.post("/", async (request, response) => {
  //check the user input first
  const joiSchema = validateUser();
  const { error } = joiSchema.validate(request.body);
  if (error) return response.status(400).send("400:Bad request");

  const users = new User({
    username: request.body.username,
    password: request.body.password,
    email: request.body.email,
    isAdmin: request.body.isAdmin,
  });

  //encrypting the user passwords here
  const salt = await bcrypt.genSalt(10);
  const HashedPassword = await bcrypt.hash(users.password, salt);
  //replacing users password with users hashed password
  users.password = HashedPassword;
  //now since we dont want  to store the pasword in plain text we encrypt it usin the bcrypt module
  const userRegistered = await users.save();
  response.send(_.pick(users, ["username", "email", "isAdmin"]));
});
module.exports = router;
