module.exports = function(app) {
  app.get("/", function(req, res) {
   res.render("home.ejs");
 });

 app.get("/about", function(req, res) {
   res.render("about.ejs");
 });

 app.get("/addfood", function(req, res) {
   res.render("addfood.ejs");
 });

  app.post("/foodadded", function(req,res){
  let sqlquery = "INSERT INTO food (name, unit, calorie, carbs, fat, protein, salt, sugar) VALUES (?,?,?,?,?,?,?,?)";
  let newrecord = [req.body.name, req.body.unit, req.body.calorie, req.body.carbs, req.body.fat, req.body.protein, req.body.salt, req.body.sugar];
  db.query(sqlquery, newrecord, (err, result) => {
    if(err){
       return console.log(err.message);
     }else{
       res.send('<p> Food is added to database </p>' + '<li> Food : ' + req.body.name + '</li>' + '<li> Unit : ' + req.body.unit + '</li>' + '<li> Calorie : ' + req.body.calorie + '</li>' + '<li> Carbs : ' + req.body.carbs + '</li>' + '<li> Fat : ' + req.body.fat + '</li>' + '<li> Protein : ' + req.body.protein + '</li>'+ '<li> Salt : ' + req.body.salt + '</li>'+ '<li>Sugar : ' + req.body.sugar + '</li>'+'<ul class="nav navbar-nav"><li><a href="/">Home</a></li><li><a href="/about">About</a></li><li><a href="/addfood">Add Food</a></li><li><a href="/">Search Food</a></li><li><a href="/">Update Food</a></li><li><a href="/">Delete Food</a></li><li><a href="/">Foods List</a></li> <li><a href="/">Calorie Counter</a></li></ul>')
     }
   });
  });

  app.get("/search", function(req, res) {
    res.render("search.ejs");
  });
}

// ("Food is added to database, food : " + req.body.name + " unit : " + req.body.unit + " calorie : " + req.body.calorie + " carbs : " + req.body.carbs + " fat : " + req.body.fat + " protein : " + req.body.protein + " salt : " + req.body.salt + " sugar : " + req.body.sugar);
