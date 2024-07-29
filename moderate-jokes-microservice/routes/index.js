const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

const jokes = [];
const credentials = { email: "admin@admin.com", password: "admin123" };

app.post("/auth", (req, res) => {
  const { email, password } = req.body;
  if (email === credentials.email && password === credentials.password) {
    res.json({ token: "authenticated" });
  } else {
    res.status(401).send("Unauthorized");
  }
});

app.get("/jokes", (req, res) => {
  res.json(jokes);
});

app.post("/jokes", (req, res) => {
  jokes.push(req.body);
  res.send("Joke added");
});

app.put("/jokes/:id", (req, res) => {
  const joke = jokes[req.params.id];
  if (joke) {
    Object.assign(joke, req.body);
    res.send("Joke updated");
  } else {
    res.status(404).send("Joke not found");
  }
});

app.delete("/jokes/:id", (req, res) => {
  jokes.splice(req.params.id, 1);
  res.send("Joke deleted");
});

app.listen(3000, () => {
  console.log("Moderate Jokes service running on port 3000");
});
