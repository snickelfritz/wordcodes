var express = require('express');
var path = require('path');
var app = express();

app.use("/static", express.static(path.join(__dirname, "/../public")))

app.get("/", function(req, res) {
    var filePath = path.join(__dirname + "/../index.html");
    res.sendFile(filePath);
});

app.listen(8080);
