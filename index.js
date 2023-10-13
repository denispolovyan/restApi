import express from "express";

import { db } from "./constants.js";

let users = db.users;

const PORT = 5000;

const app = express();

const jsonBodyMiddleware = express.json();

app.use(jsonBodyMiddleware);

//   ---- // MAIN

app.get("/", (req, res) => {
  //   res.json({status: "main"});
  res.json("It is main page");
});

//   ---- // USERS GET

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

//   ---- // USERS POST

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

  res.status(201).json(users);
});



// ======>>> LISTEN

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
