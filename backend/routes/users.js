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

router.post("/user/signup", (req, res) => {
  console.log("signup route");
  console.log(req.body);
  if (!checkBody(req.body, ["nickname", "email", "adress", "password"])) {
    res.json({ result: false, error: "Un des champs est manquant ou vide" });
    return;
  }

  User.findOne({ nickname: { $regex: new RegExp(req.body.nickname, "i") } })
    .then((data) => {
      if (data === null) {
        const hash = bcrypt.hashSync(req.body.password, 10);

        const newUser = new User({
          nickname: req.body.nickname,
          email: req.body.email,
          adress: req.body.adress,
          password: req.body.password,
          token: uid2(32),
          isLog: true,
        });

        newUser.save().then((data) => {
          console.log("back : ", data.profilePicture);
          res.json({ result: true, user: data });
        });
      } else {
        res.json({ result: false, error: "Utilisateur déjà existant" });
      }
    })
    .catch((error) => {
      console.error("Erreur:", error);
      res.json({ result: false, error: "Erreur" });
    });
});

module.exports = router;
