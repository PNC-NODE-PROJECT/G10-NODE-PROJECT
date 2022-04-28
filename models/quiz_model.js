const mongoose = require("mongoose");

// TODO: Connect to MangoDB
mongoose.connect(process.env.DATABASE_URL, {useUnifiedTopology: true});

// Check if connection is successfull
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully");
});

const quizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    }
});
const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    answers: {
        type: Array,
        required: true
    },
    correctA: {
        type: Array,
        required: true
    },
    score: {
        type: Number,
        default: 0
    },
    typeOfQ: {
        type: String,
        required: true
    },
    idOfQ: {
        type: Object,
        required: true
    },

});

const questionModel = mongoose.model("questions", questionSchema);
const quizModel = mongoose.model("quizes", quizSchema);

module.exports = {questionModel, quizModel};
