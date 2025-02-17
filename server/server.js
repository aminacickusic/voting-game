const express = require("express");
const cors = require("cors");
const app = express();
const corsOptions = {
    origin: ["https://localhost:5173"],
}

app.use(cors(corsOptions))

app.get("/api", (req, res) => {
res.json({fruits: ["apple", "orange", "banana"]});


})


app.listen(9000, () => {
console.log("Server started on port 9000");
});