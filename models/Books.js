const mongoose = require("mongoose");
const _ = require("lodash");
const { request } = require("express");
const joi = require("Joi");

const bookSchema = mongoose.Schema({
  name: {
    type: String,
    minlength: 5,
    required: true,
    maxlength: 50,
    validate: {
      validator: function (BookName) {
        BookName != null ? true : false;
      },
      message: "A Books should have a name",
    },
  },
  author: {
    type: [String],
    minlength: 3,
    maxlength: 50,
    required: true,
    validate: {
      validator: function (arrays) {
        return arrays && arrays.length > 0;
      },
      message: "A Book should atleast have one author",
    },
  },
  price: {
    type: Number,
    min: 2,
    max: 200,
    required: true,
  },
});

//creating model
const Book = mongoose.model("Book", bookSchema);

function validateUserInput(request) {
  //defining joi validation schema
  const JoiSchema = joi.object({
    name: joi.string().min(3).max(50).required(),
    author: joi.array().items(joi.string().min(3).max(50)).min(1),
    price: joi.number().min(2).max(200).required(),
  });
  return JoiSchema;
}

module.exports = {
  Book: Book,
  validateInput: validateUserInput,
};
