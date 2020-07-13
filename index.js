const express = require("express");
const app = express();
const port = 8089;

// app.set("views",__dirname + "/views");
// app.use(express.static('views'));
// app.use('/static', express.static(path.join(__dirname, 'views')));
// index page
//
// app.use(express.static(__dirname + '/views'));
// app.use('/static', express.static(__dirname + '/views'));
app.set("view engine", "ejs");

app.get('/', function(req, res) {
    res.render('home');
});

// app.engine("html", require("ejs").renderFile);
app.listen(port, () => console.log(`Listening at ${port}.......`));
