var express = require('express');
var router = express.Router();

require("../models/connection.js");
const User = require("../models/user.js");
const { checkBody } = require("../modules/checkBody.js");
const bcrypt = require("bcrypt");
const uid2 = require("uid2");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//creation de compte
router.post("/users/signup", (req, res) => {
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


//connexion
router.post("/users/signin", (req, res) => {
  try {
    if (!checkBody(req.body, ["email", "password"])) {
      res.json({ result: false, error: "Un des champs est manquant ou vide" });
      return;
    }

    User.findOne({ email: { $regex: new RegExp(req.body.email, "i") } })
      .then((data) => {
        console.log("data => ", data);
        console.log(
          "password resp => ",
          bcrypt.compareSync(req.body.password, data.password)
        );
        if (data && bcrypt.compareSync(req.body.password, data.password)) {
          res.json({ result: true, email: data.email, token: data.token });
        } else {
          res.json({
            result: false,
            error: "Utilisateur non trouvé ou mot de passe erroné",
          });
        }
      })
      .catch((error) => {
        console.error("Erreur de connexion:", error);
        res.json({ result: false, error: "Erreur de connexion" });
      });
  } catch (error) {
    res.status(500).json({ message: "error", error });
  }
});

//deconnexion
router.put("/users/logout", (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.json({ result: false, error: "Token invalide" });
  }

  User.updateOne({ token: token }, { isLog: false })
    .then((result) => {
      if (result.modifiedCount > 0) {
        res.json({ result: true, message: "Déconnexion réussie" });
      } else {
        res.json({
          result: false,
          error: "Utilisateur non trouvé ou déjà déconnecté",
        });
      }
    })
    .catch((error) => {
      console.error("Erreur de déconnexion:", error);
      res.json({ result: false, error: "Erreur de déconnexion" });
    });
});


module.exports = router;
