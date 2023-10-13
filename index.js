import express from "express";

import { db } from "./constants.js";

let users = db.users;

const PORT = 5000;

const app = express();

const jsonBodyMiddleware = express.json();

app.use(jsonBodyMiddleware);

//   ------------------------- // MAIN

app.get("/", (req, res) => {
  //   res.json({status: "main"});
  res.json("It is main page");
});
//
//
//
//   ------------------------- // USERS GET
/*
fetch('http://localhost:5000/users', {method: 'GET'}).then(res => res.json()).then(json => console.log(json))
*/

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
//
//
//
//   ------------------------- // USERS POST
/*
fetch('http://localhost:5000/users', {method: 'POST', body: JSON.stringify({name: "Ann", balance: 2000, age: 19}), headers: {'content-type': 'application/json'}}).then(res => res.json()).then(json => console.log(json))
*/

app.post("/users", (req, res) => {
  //  if (
  //    !isNumeric(trim(req.body.balance)) ||
  //    isNumeric(trim(req.body.name)) ||
  //    trim(req.body.age) <= 1
  //  ) {
  // 	res.sendStatus(404)
  //  }

  users.push({
    id: users.length + 1,
    name: req.body.name,
    age: req.body.age,
    balance: req.body.balance,
  });

  res.sendStatus(201);
});
//
//
//
//   ------------------------- // USERS DELETE
/*
fetch('http://localhost:5000/users/2', {method: 'DELETE'}).then(res => res.json()).then(json => console.log(json))
*/

app.delete("/users/:id", (req, res) => {
  let filteredUsers = [];

  users.forEach((user) => {
    if (user.id != req.params.id) {
      filteredUsers.push(user);
    }
  });

  if (filteredUsers.length == users.length) {
    res.sendStatus(404);
    return;
  }

  users = filteredUsers;

  res.sendStatus(204);
});
//
//
//
//   ------------------------- // USERS PUT
/*
fetch('http://localhost:5000/users/3', {method: 'PUT', body: JSON.stringify({name: "Ann", balance: 2000, age: 19}), headers: {'content-type': 'application/json'}}).then(res => res.json()).then(json => console.log(json))
 */
app.put("/users/:id", (req, res) => {
  if (!req.body.age || !req.body.balance || !req.body.name) {
    res.sendStatus(404);
    return;
  }

  const userToUpdate = users.find((user) => user.id == req.params.id);

  if (!userToUpdate.id) {
    res.sendStatus(404);
    return;
  }

  userToUpdate.name = req.body.name;
  userToUpdate.age = req.body.age;
  userToUpdate.balance = req.body.balance;


  res.send(204);
});
//
//
//
// =================================>>> LISTEN

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
