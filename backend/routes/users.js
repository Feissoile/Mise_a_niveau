var express = require('express');
var router = express.Router();

const connection = require("../models/connection.js");
const User = require("../models/user.js");
const { checkBody } = require("../modules/checkBody.js");
const bcrypt = require("bcrypt");
const uid2 = require("uid2");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
