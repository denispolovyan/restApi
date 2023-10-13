import express from "express";

const PORT = 5000;

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send({status: "main"});
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
