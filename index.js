//this returns a class
const Express = require("express");
const mongoose = require("mongoose");
const app = Express();

app.use(Express.json());
app.set("view engine", "pug");
app.set("views", "./views");

//the design of this app has 3 parts
// 1. Home page
// 2. the directory where we actually do the operations : get, post,put and delete

//importing routes
const HomePage = require("./routes/HomePage");
const MainOperations = require("./routes/MainOperations");

app.use("/", HomePage);
app.use("/api/books", MainOperations);
//retruns a promise
const DataBaseConnectionStatus = mongoose.connect(
  "mongodb://localhost:27017/Bookdirectory",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  }
);

DataBaseConnectionStatus.then(() => {
  console.log("Connection established ");
});
DataBaseConnectionStatus.catch((error) => {
  console.log("Connection rejected...Try again");
});

const port = process.env.PORT || 3000;
//listen
app.listen(port, () => {
  console.log(`listening to the port ${port}....`);
});
