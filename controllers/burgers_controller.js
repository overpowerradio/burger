var express = require("express");
var router = express.Router();

// Import the model (cat.js) to use its database functions.
var burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  burger.all(function(data) {
    var hbsObject = {
      burger: data
    };
    
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/", function(req, res) {
  burger.create([
    "burger_name", "devoured"
  ], [
    req.body.burger_name, req.body.devoured
  ], function() {
    res.redirect("/");
  });
});

router.put("/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition ", condition);

  burger.update({
    devoured: req.body.devoured
  }, condition, function() {
    res.redirect("/");
  });
});


// Export routes for server.js to use.
module.exports = router;









//***************************************************************************************************

// app.get("/", function(req, res) {
//   connection.query("SELECT * FROM movies;", function(err, data) {
//     if (err) {
//       throw err;
//     }
//     res.render("index", { flick: data });
//   });
// });

// app.post("/", function(req, res) {
//   connection.query("INSERT INTO movies (movie) VALUES (?)", [req.body.movie], function(err, result) {
//     if (err) {
//       throw err;
//     }

//     res.redirect("/");
//   });
// });

// app.delete("/:id", function(req, res) {
//   connection.query("DELETE FROM movies WHERE id = ?", [req.params.id], function(err, result) {
//     if (err) {
//       throw err;
//     }

//     res.redirect("/");
//   });
// });

// app.put("/", function(req, res) {
//   connection.query("UPDATE movies SET movie = ? WHERE id = ?", [req.body.movie, req.body.id], function(err, result) {
//     if (err) {
//       throw err;
//     }

//     res.redirect("/");
//   });
// });