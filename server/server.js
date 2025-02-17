const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jokeRouter = require("./routes/jokes");
const axios = require('axios');

const app = express();
const url = "mongodb://localhost/voting_game";

const corsOptions = {
    origin: ["http://localhost:5173"],
};

app.use(cors(corsOptions));
app.use(express.json());


mongoose.connect(url);

const con = mongoose.connection;
con.on("open", () => {
    console.log("Connected to MongoDB!");
});


app.use("/api/joke", jokeRouter);

app.listen(9000, () => {
    console.log("Server started on port 9000");
});
