const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const redis = require("redis");

// Create Redis Client
let client = redis.createClient();

client.on("connect", function () {
  console.log("Connected to Redis...");
});

// Set Port
const port = 3000;

// Init app
const app = express();

// View Engine\
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// methodOverride
app.use(methodOverride("_method"));
// Search Page
app.get("/", function (req, res, next) {
  res.render("searchblogs");
});

// Search processing
app.post("/blog/search", function (req, res, next) {
  let id = req.body.id;

  client.hgetall(id, function (err, obj) {
    // if object does not exist
    if (!obj) {
      // render the home page
      res.render("searchblogs", {
        error: "Blog does not exist",
      });
    } else {
      // otherwise
      obj.id = id;
      // render the details page, passing in the blog
      res.render("details", {
        blog: obj,
      });
    }
  });
});

// Add User Page
app.get("/blog/add", function (req, res, next) {
  res.render("addblog");
});

// at the addblog.handlebars, we accept the three paramters - id, title and description
app.post("/blog/add", function (req, res, next) {
  let id = req.body.id;
  let title = req.body.title;
  let description = req.body.description;

  // we then create this -> the id is the key here, the title is also key
  /*
redis> HMSET myhash field1 "Hello" field2 "World"
"OK"
redis> HGET myhash field1
"Hello"
    */
  // pass in a callback as well
  client.hmset(id, ["title", title, "description", description], function (
    err,
    reply
  ) {
    if (err) {
      console.log(err);
    }
    console.log(reply);
    res.redirect("/");
  });
});

// Delete User
app.delete("/blog/delete/:id", function (req, res, next) {
  client.del(req.params.id);
  res.redirect("/");
});

app.listen(port, function () {
  console.log("Server started on port " + port);
});
