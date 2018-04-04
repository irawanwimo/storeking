const mongoose = require('mongoose');

const dishSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    age: Number
});

module.exports = mongoose.model('Dish', dishSchema);