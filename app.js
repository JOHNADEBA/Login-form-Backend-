const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const database = {
  users: [
    {
      id: "123",
      name: "August",
      email: "august@gmail.com",
      password: "cookies",
      entries: 0,
      joined: new Date(),
    },

    {
      id: "124",
      name: "Anna",
      email: "anna@gmail.com",
      password: "food",
      entries: 0,
      joined: new Date(),
    },
  ],
};

app.get("/", (req, res) => {
  res.json(database);
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  database.users.push({
    id: "125",
    name,
    email,
    password,
    entries: 0,
    joined: new Date(),
  });
  res.json(database.users[database.users.length - 1]);
});

app.post("/signin", (req, res) => {
  req.body.email === database.users[0].email &&
  req.body.password === database.users[0].password
    ? res.json("sucess")
    : res.status(404).json("failed attemp");
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  });
  if (!found) {
    res.status(404).json("failed attemp");
  }
});

app.put("/image", (req, res) => {
  const { id } = req.body;
  let found = false;

  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      user.entries++;
      res.json(user.entries);
    }
  });
  if (!found) {
    res.status(404).json("failed attemp");
  }
});

app.listen(1500, () => {
  console.log("we good");
});
