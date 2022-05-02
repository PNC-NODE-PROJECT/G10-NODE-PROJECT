const express = require('express');
const bcrypt = require("bcrypt");
const router = express.Router();

const model = require('../models/quiz_model');
const userModel = model.userModel;

// ROUTE = users


// add data user sign up
router.post("/", async (req, res)=>{
            let data = req.body
            // const dataPassword = req.body.password
            // const hashedPassword = await bcrypt.hash(dataPassword, 10);
            userModel.create(data)
            .then((result) => {
                res.send(result);
            })
            .catch((error)=>{
                res.send(error);
            })
})

// get all user 
router.get("/", (req, res)=>{
    userModel.find()
    .then((result) =>{
        res.send(result)

    })
    .catch((error) =>{
        res.send(error)
    })
})

// get one user
router.get("/:id", (req, res)=>{
    let userId = req.params.id;
    userModel.get({_id: userId})
    .then((result) =>{
        res.send(result)
    })
    .catch((error)=>{
        res.send(error)
    })
})

module.exports = router;