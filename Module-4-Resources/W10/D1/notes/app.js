const express = require("express");
const app = express();

app.get('/status', (request, response) => {
  response.send('Hello from app!');
});


const port = 8000;
app.listen(port, console.log(`Server is listening on port ${port}`));
