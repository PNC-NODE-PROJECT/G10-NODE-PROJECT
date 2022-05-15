const express = require('express');
const router = express.Router();

const model = require('../models/quiz_model');
const scoreModel = model.scoreModel;

// ROUTE = scores

// get userscore
router.get("/", (req, res) => {
    scoreModel.find()
    .then((result) => {
        res.send(result)
    })
    .catch((error) => {
        res.send(error)
    })
})

// add userscore
router.post("/", (req, res) => {
    let data = req.body;
    scoreModel.create(data)
    .then((result) => {
        res.send(result)
    })
    .catch((error) => {
        res.send(error)
    })
})

module.exports = router;
