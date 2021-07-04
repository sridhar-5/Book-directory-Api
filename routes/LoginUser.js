const Express = require("express");
const jwt = require("jsonwebtoken");
const router = Express.Router();
const bcrypt = require("bcrypt");
const {
  User,
  validateUser,
  validateUserLoginCredentials,
} = require("../models/Users");

const joi = require("Joi");

router.post("/", async (request, response) => {
  const JoiSchema = validateUserLoginCredentials();
  const { error } = JoiSchema.validate(request.body);

  if (error) return response.status(400).send(error.details[0].message);
  const checkUser = await User.findOne({ username: request.body.username });
  if (!checkUser)
    return response.status(400).send("Invalid Username or Password");

  const checkPassword = await bcrypt.compare(
    request.body.password,
    checkUser.password
  );
  if (!checkPassword)
    return response.status(400).send("Invalid Username or Password");

  //if it passes both the clauses then a token is generated
  const token = checkUser.GenerateAuthToken();
  response.header("x-auth-token", token).send(token);
});
module.exports = router;
