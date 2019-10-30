//basically copying and pasting everything that was normally in the server.js yesterday
const router = require("express").Router();
const db = require("../data/db");

//setting up first test route
router.get("/", (req, res) => {
  res.send("This should be in Postman");
});

module.exports = router;
