const express = require('express');
const router = express.Router();

const model = require('../models/quiz_model');
const questionModel = model.questionModel;

// ROUTE = questions

// add question
router.post("/", (req, res) => {
    let data = req.body;
    questionModel.create(data)
    .then((result) => {
        res.send(result)
    })
    .catch((error) => {
        res.send(error)
    })
})

// get questions
router.get("/:quizId", (req, res) => {
    questionModel.find({idOfQ: req.params.quizId})
    .then((result) => { 
        res.send(result)
    })
    .catch((error) => {
        res.send(error)
    })
})

// delete a question
router.delete("/:id", (req, res) => {
    let questId = req.params.id;
    questionModel.deleteOne({_id: questId})
    .then((result) => {
        res.send(result)
    })
    .catch((error) => {
        res.send(error)
    })
})

// delete many question
router.delete("/delete/:titleId", (req, res) => {
    let id = req.params.titleId;
    questionModel.deleteMany({idOfQ: id})
    .then((result) => {
        res.send(result)
    })
    .catch((error) => {
        res.send(error)
    })
})


module.exports = router;