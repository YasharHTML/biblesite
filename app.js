const express = require("express");
const app = express();

app.use("/css", express.static("./public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/htmls/index.html");
});

app.listen(3000);