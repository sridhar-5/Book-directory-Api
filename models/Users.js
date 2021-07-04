const mongoose = require("mongoose");
const joi = require("Joi");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlenghth: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 60,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

UserSchema.methods.GenerateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, email: this.email },
    process.env.JWT_SECRET_KEY
  );
  return token;
};

const User = mongoose.model("user", UserSchema);

function validateUser() {
  //defining joi validation schema
  const JoiSchema = joi.object({
    username: joi.string().min(5).max(50).required(),
    password: joi.string().min(5).max(50).required(),
    email: joi.string().min(8).max(60).required(),
    isAdmin: joi.boolean(),
  });
  return JoiSchema;
}

function validateUserLoginCredentials() {
  //defining joi validation schema
  const JoiUserLoginSchema = joi.object({
    username: joi.string().min(5).max(50).required(),
    password: joi.string().min(5).max(50).required(),
  });
  return JoiUserLoginSchema;
}

module.exports = {
  User: User,
  validateUser: validateUser,
  validateUserLoginCredentials: validateUserLoginCredentials,
};
