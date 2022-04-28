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



module.exports = router;