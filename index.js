const express = require("express");
const app = express();
const port = 8089;

require("./route/main")(app);
app.set("views",__dirname + "/views");
app.use(express.static('views'));
app.use(express.static(__dirname + '/views'));
app.set("view engine", "ejs");

app.get('/', function(req, res) {
    res.render('home');
});

// app.engine("html", require("ejs").renderFile);
app.listen(port, () => console.log(`Listening at ${port}.......`));
