const express = require('express');
const bodyParser = require('body-parser');
const routesHandler = require('./routes/handler.js');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // Convert everything to JSON format
app.use('/', routesHandler);

const PORT = 4000; // Backend routing port
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}.`)
});