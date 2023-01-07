var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/hello-world", (req, res, next) => {
  res.json({
    hello: "world",
  });
});

router.post("/pipeline-finished", (req, res, next) => {
  res.json({ message: "pipeline done" });
});
module.exports = router;
