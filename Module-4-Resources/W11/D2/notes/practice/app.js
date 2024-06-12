const express = require("express");
require("dotenv").config();
const app = express();
app.get('/status', (req, res) => {
  res.send('Hello from the app.js');
});

const port = 5001;
app.listen(port, console.log(`Server is listening on port ${port}`));
