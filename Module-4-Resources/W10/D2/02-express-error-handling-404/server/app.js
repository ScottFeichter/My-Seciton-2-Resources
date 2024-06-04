const express = require('express');
const app = express();
// app.use(express.json());

app.get('/', (req, res) => {
  res.send('GET / This is the root URL');
});

app.use((req, res, next) => {
  const err = new Error();
  err.message = "Sorry, the requested resource coun't be found.";
  err.statusCode = "404"
  // console.log(err);
  next(err);
});

app.use('/*', (error, req, res, next) => {
  // console.log(error);
  const status = error.statusCode || "500";

  res.status(status)
  res.json({
    message: error.message || "Something wrong",
    status
  })
});

const port = 5000;
app.listen(port, () => console.log('Server is listening on port', port));
