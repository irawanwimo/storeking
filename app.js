const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://storeking:storeking@storeking-pac3w.mongodb.net/test');

const dishRouter = require('./api/routes/dishRouter');
const promoRouter = require('./api/routes/promoRouter');
const leaderRouter = require('./api/routes/leaderRouter');

app.use('/dishes', dishRouter);

app.use('/promotions', promoRouter);

app.use('/leadership', leaderRouter);

module.exports = app;