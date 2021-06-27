const express = require("express");
const router = express.Router();
const config = require("../config");

router.get("/", (req, res) => {
  res.status(200).send("api/auth > Hello World");
});

module.exports = router;
