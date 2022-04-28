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

module.exports = router;