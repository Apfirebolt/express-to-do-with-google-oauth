const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/User");

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.get("/register", (req, res) => {
  res.render("auth/register");
});

router.post("/login", (req, res) => {
  try {
    passport.authenticate("local", {
      successRedirect: "/dashboard",
      failureRedirect: "/",
    })(req, res, next);
  } catch (err) {
    console.log("Error is ", err);
  }
});

router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      res.redirect("/auth/register");
    } else {
      const newUser = new User({
        firstName: req.body.firstNname,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => {
              res.redirect("/auth/login");
            })
            .catch((err) => {
              console.log(err);
              return;
            });
        });
      });
    }
  });
});

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
