const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

mongoose.connect('mongodb://storeking:storeking@storeking-shard-00-00-pac3w.mongodb.net:27017,storeking-shard-00-01-pac3w.mongodb.net:27017,storeking-shard-00-02-pac3w.mongodb.net:27017/test?ssl=true&replicaSet=storeking-shard-0&authSource=admin');

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

app.use(morgan('dev'));

app.use('/dishes', dishRouter);
app.use('/promotions', promoRouter);
app.use('/leadership', leaderRouter);

module.exports = app;