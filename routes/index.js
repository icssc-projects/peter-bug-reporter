var express = require("express");
var router = express.Router();
var api_helper = require("./API_helper");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Peter Bug Reporter" });
});

router.post("/submitted", function (req, res, next) {
  body_string =
    "DESCRIPTION: " +
    req.body.description +
    "\n\nSTEPS TO REPRODUCE: " +
    req.body.steps +
    "\n\nEXPECTED BEHAVIOR: " +
    req.body.behavior +
    "\n\nPLATFORM: " +
    req.body.platform;

  api_helper
    .make_API_call(
      "https://api.github.com/repos/icssc-projects/peter-bug-reporter/issues",
      { title: req.body.title, body: body_string }
    )
    .then((response) => {
      if (response.errors) res.render("submitted", { status: "Failed" });
      else res.render("submitted", { status: "Succeeded" });
    })
    .catch((error) => {
      res.send(error);
    });
});

module.exports = router;
