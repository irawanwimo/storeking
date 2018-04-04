const express = require('express');
const mongoose = require("mongoose");
const router = express.Router();

const Dishes = require("../../model/dish");

router.get('/:id', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /dishes'
    });
});

router.post('/', (req, res, next) => {
    const dishes = new Dishes({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        age: req.body.age
    });
    dishes
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Handling POST requests to /dishes",
        createdDishes: result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.delete('/:id', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /dishes'
    });
});

module.exports = router;