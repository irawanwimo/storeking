const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://storeking:storeking@storeking-pac3w.mongodb.net/test');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

const dishRouter = require('./api/routes/dishRouter');
const promoRouter = require('./api/routes/promoRouter');
const leaderRouter = require('./api/routes/leaderRouter');

app.use('/dishes', dishRouter);

app.use('/promotions', promoRouter);

app.use('/leadership', leaderRouter);

module.exports = app;