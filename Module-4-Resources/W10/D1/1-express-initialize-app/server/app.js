const express = require("express");
const app = express();

app.get("/status", (request, response) => {
  response.send("Hello from the server");
});

const port = 8001;
app.listen(port, console.log(`Server is listening on port ${port}`));
