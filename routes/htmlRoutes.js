// Requiring path to so we can use relative routes to our HTML files
const path = require("path");
const router = require("express").Router();

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

router.get("/", (req, res) => {
  // If the user already has an account send them to the members page
  if (req.user) {
    res.redirect("/members");
  }
  res.render("index");
});

router.get("/signup", (req, res) => {
  // If the user already has an account send them to the members page
  if (req.user) {
    res.redirect("/members");
  }
  res.render("signup");
});

router.get("/create", (req, res) => {
  // If the user already has an account send them to the members page
  // if (!req.user) {
  //   res.redirect("/");
  // }
  res.render("createOrUpdate", { title: "Create" });
});

router.get("/update", (req, res) => {
  // // If the user already has an account send them to the members page
  // if (!req.user) {
  //   res.redirect("/");
  // }
  res.render("createOrUpdate", { title: "Update" });
});
// Here we've add our isAuthenticated middleware to this route.
// If a user who is not logged in tries to access this route they will be redirected to the signup page
router.get("/members", isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, "../public/members.html"));
});

module.exports = router;
