const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql");
const port = 8089;

app.use(bodyParser.urlencoded({extended : true}));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "hayakyon",
  database: "myFoodList",
  insecureAuth: true
});
db.connect((err) => {
  if(err) throw err;
  console.log("Connected to database");
});
global.db = db;

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
