const express = require('express');
const app = express();

// Your code here

// app.use('/stylesheets', express.static("assets/css"));
// app.use(express.static("assets"));
app.use(express.static("assets/scripts"));

// app.get('stylesheets/application.css', (req, res) => {

// });

const port = 5000;
app.listen(port, () => console.log('Server is listening on port', port));
