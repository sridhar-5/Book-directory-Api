const Express = require("express");

const router = Express.Router();

router.get("/", (request, response) => {
  response.render("HomePage", {
    title: "Welcome..!",
    MainHeader: "Welcome to the Book Directory",
  });
});

module.exports = router;
