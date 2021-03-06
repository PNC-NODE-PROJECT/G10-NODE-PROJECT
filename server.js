require('dotenv').config()
const express = require("express");
var cors = require("cors");

const app = express();

app.use(cors({origin: '*'}));

app.use(express.urlencoded());
app.use(express.json()); // To read json data in request body


const PORT = process.env.PORT || 3000;


const questRoute = require("./routes/questions");
const titleRoute = require("./routes/title");
const userRoute = require("./routes/user");
const scoreRoute = require("./routes/score");

app.use("/questions", questRoute);
app.use("/titles", titleRoute);
app.use("/users", userRoute);
app.use("/scores", scoreRoute);

app.use(express.static("public"));

app.listen(PORT, (error)=>{
    console.log("http://localhost:" + PORT);
})



