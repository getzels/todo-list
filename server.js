const express = require("express");
const mongoose = require('mongoose');
const {dotenv} = require('dotenv').config();
const bodyParser = require('body-parser');
const swaggerAutogen = require('swagger-autogen')();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger-output.json');
const db = require('./models');
const session = require('express-session')

const cors = require('cors');
const app = express();

const port = process.env.PORT || 3000
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

var options = {
    explorer: true
};

// Authentication configuration
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.CLIENT_SECRET
}));

app.use('/task', require('./routers/taskRouter'));
app.use('/auth', require('./routers/authentication'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
});