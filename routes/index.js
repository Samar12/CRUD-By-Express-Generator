var express = require("express");
var router = express.Router();
let users = [{ id: 1, name: "Samar", age: 23 }, { id: 2, name: "ALaa", age: 24 }, { id: 3, name: "Fatma", age: 24 }];

router.get("/", function(req, res) {
  res.render("index", { title: "Express" });
});

router.get("/users", function(req, res) {
  res.render("allUsers", { users });
});
router.get("/user/add", function(req, res) {
  res.render("add", { title: "Add User" });
});
router.post("/user/add", function(req, res) {
  req.body.id = users.length + 1;
  users.push(req.body);
  res.render("allUsers", { users });
});

router.get("/user/update/:id", function(req, res) {
  const user = users.filter(u => u.id == req.params.id)[0];
  let result;
  res.render("Update", { name: user.name, age: user.age, id: user.id });
});
router.post("/user/update/:id", function(req, res) {
  console.log(req.body.id);
  users = users.map(user => (user.id == req.params.id ? { id: req.params.id, name: req.body.name, age: req.body.age } : user));
  res.redirect("/users");
});

router.get("/user/delete/:id", function(req, res) {
  console.log(req.params.id);
  users.splice(users.indexOf(users.filter(u => u.id == req.params.id)[0]), 1);
  res.redirect("/users");
});

module.exports = router;
