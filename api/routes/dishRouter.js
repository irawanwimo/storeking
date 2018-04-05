const express = require('express');
const mongoose = require("mongoose");
const router = express.Router();

const Dishes = require("../../model/dish");

router.get("/", (req, res, next) => {
    Dishes.find()
    .exec()
    .then(docs => {
    console.log(docs);
    //   if (docs.length >= 0) {
    res.status(200).json(docs);
    //   } else {
    //       res.status(404).json({
    //           message: 'No entries found'
    //       });
    //   }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
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

router.get("/:personId", (req, res, next) => {
    const id = req.params.personId;
    Dishes.findById(id)
      .exec()
      .then(doc => {
        console.log("From database", doc);
        if (doc) {
          res.status(200).json(doc);
        } else {
          res
            .status(404)
            .json({ message: "No valid entry found for provided ID" });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
});

router.patch("/:personId", (req, res, next) => {
    const id = req.params.personId;
    const updateOps = {};
    for (const ops of req.body) {
      updateOps[ops.propName] = ops.value;
    }
    Product.update({ _id: id }, { $set: updateOps })
      .exec()
      .then(result => {
        console.log(result);
        res.status(200).json(result);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
});
  

  router.delete("/:personId", (req, res, next) => {
    const id = req.params.personId;
    Dishes.remove({ _id: id })
      .exec()
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
});

module.exports = router;