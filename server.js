var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

var app = express();
var port = 3375;

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

app.use(methodOverride("_method"));

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var mysql = require("mysql");

var access = require('./mysql-access.js')
//link to a variable with my passord in it, so it isn't visible on this page. Adding it to the ".gitignore" file will prevent it from being uploaded to git as well.

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: access,
  database: "movie_planner_db"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

app.get("/", function(req, res) {
  connection.query("SELECT * FROM movies;", function(err, data) {
    if (err) {
      throw err;
    }
    res.render("index", { flick: data });
  });
});

app.post("/", function(req, res) {
  connection.query("INSERT INTO movies (movie) VALUES (?)", [req.body.movie], function(err, result) {
    if (err) {
      throw err;
    }

    res.redirect("/");
  });
});

app.delete("/:id", function(req, res) {
  connection.query("DELETE FROM movies WHERE id = ?", [req.params.id], function(err, result) {
    if (err) {
      throw err;
    }

    res.redirect("/");
  });
});

app.put("/", function(req, res) {
  connection.query("UPDATE movies SET movie = ? WHERE id = ?", [req.body.movie, req.body.id], function(err, result) {
    if (err) {
      throw err;
    }

    res.redirect("/");
  });
});

app.listen(port, function(req, res){
  console.log("The port number is: " + port);
});
