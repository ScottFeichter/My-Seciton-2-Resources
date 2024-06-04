const express = require("express");
const app = express();

app.get("/status", (request, response) => {
  response.send("Hello from app!");
});

app.get("/friends-page", (req, res) => {
  res.send("<h1>Freinds Page sent this via h1</h1>");
});

app.get("/json", (req, res) => {
  res.json({ name: "Shane", age: 42 });
});

app.post('/create', (req, res) => {
  console.log(req.body);
  res.send('hello from post create');
});

const port = 8000;
app.listen(port, console.log(`Server is listening on port ${port}`));
