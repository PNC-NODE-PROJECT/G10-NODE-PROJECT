const express = require('express');
const router = express.Router();

const model = require('../models/quiz_model');
const quizModel = model.quizModel;

// ROUTE = titles

// add title quiz
router.post("/", (req, res) => {
    let data = req.body;
    quizModel.create(data)
    .then((result) => {
        res.send(result)
    })
    .catch((error) => {
        res.send(error)
    })
})

// get title of quiz
router.get("/", (req, res) => {
    quizModel.find()
    .then((result) => {
        res.send(result)
    })
    .catch((error) => {
        res.send(error)
    })
})

// delete title or quiz
router.delete("/:id", (req, res) => {
    let titleId = req.params.id;
    quizModel.deleteOne({_id: titleId})
    .then((result) => {
        res.send(result)
    })
    .catch((error) => {
        res.send(error)
    })
})

// edit tile of quiz
router.put("/", (req, res) => {
    let data = req.body;
    quizModel.updateOne({_id: data.id}, {title: data.title})
    .then((result) => {
        res.send(result)
    })
    .catch((error) => {
        res.send(error)
    })
})

// get olny one quiz title 
router.get("/:id", (req, res) => {
    quizModel.find({_id : req.params.id})
    .then((result) => {
        res.send(result);
    })
    .catch((error) => {
        res.send(error);
    })
})


module.exports = router;