import express from "express";

import { db } from "./constants.js";

let users = db.users;

const PORT = 5000;

const app = express();
app.use(express.json());

//   ---- // MAIN

app.get("/", (req, res) => {
  //   res.json({status: "main"});
  res.json("It is main page");
});

//   ---- // USERS

app.get("/users", (req, res) => {
  let filteredUsers = [];

  if (req.query.name) {
    users.forEach((user) => {
      if (user.name == req.query.name) {
        filteredUsers.push(user);
      }
    });
  } else {
    filteredUsers = users;
  }

  res.json(filteredUsers);
});

app.get("/users/:id", (req, res) => {
  const user = users.find((user) => user.id == req.params.id);

  if (!user) {
    res.sendStatus(404);
    return;
  }
  res.json(user);
});

app.get("/users/balance", (req, res) => {
  const balance = users.reduce((acc, user) => acc + user.balance);

  console.log(balance);
});

// ======>>> LISTEN

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
