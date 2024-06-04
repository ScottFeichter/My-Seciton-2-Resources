const express = require('express');
const app = express();

const peopleRouter = require('./routes/people');
app.use('/people', peopleRouter);

const colorRouter = require('./routes/colors');
app.use('/colors', colorRouter);

const port = 5000;
app.listen(port, () => console.log('Server is listening on port', port));
