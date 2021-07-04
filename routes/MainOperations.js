const mongoose = require("mongoose");
const Express = require("express");
const router = Express.Router();
const { Book, validateInput } = require("../models/Books");
const joi = require("Joi");

router.get("/", async (request, response) => {
  //this info has to be retrived from the database
  //this request basically returns all the books in the directory
  const Books = await Book.find().select({ name: 1, price: 1, author: 1 });
  response.send(Books);
});

router.post("/", async (request, response) => {
  //validate before the sending the data to the database
  const joischema = validateInput();
  const { error } = joischema.validate(request.body);
  if (error) return response.status(400).send("400:Bad Request");
  const books = new Book({
    name: request.body.name,
    author: request.body.author,
    price: request.body.price,
  });
  const newBook = await books.save();
  console.log(newBook);
  response.send(books);
});

module.exports = router;

router.put("/:BookId", async (request, response) => {
  const joischema = validateInput();
  const { error } = joischema.validate(request.body);
  console.log("error", error);
  if (error) return response.status(400).send("400:Bad Request");
  const BooksUpdate = await Book.findByIdAndUpdate(request.params.BookId, {
    $set: {
      name: request.body.name,
      author: request.body.author,
      price: request.body.price,
    },
  });
  console.log(BooksUpdate);
  if (!BooksUpdate) {
    return response.status(400).send("400:Bad Request");
  }
  console.log(BooksUpdate);
  response.send(BooksUpdate);
});
