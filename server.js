const express = require("express");
const mongoose = require('mongoose');
const {dotenv} = require('dotenv').config();
const bodyParser = require('body-parser');
const swaggerAutogen = require('swagger-autogen')();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger-output.json');
const cors = require('cors');


const app = express();
const port = process.env.PORT || 3000

const db = require('./models');
db.mongoose.
    connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connected to the database!');
    })
    .catch((err) => {
        console.log('Cannot connect to the database!', err);
        process.exit();
    });



app.use('/task', require('./routers/taskRouter'));

var options = {
    explorer: true
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
});