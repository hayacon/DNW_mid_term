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
       res.send('<p> Food is added to database </p>' + '<li> Food : ' + req.body.name + '</li>' + '<li> Unit : ' + req.body.unit + '</li>' + '<li> Calorie : ' + req.body.calorie + '</li>' + '<li> Carbs : ' + req.body.carbs + '</li>' + '<li> Fat : ' + req.body.fat + '</li>' + '<li> Protein : ' + req.body.protein + '</li>'+ '<li> Salt : ' + req.body.salt + '</li>'+ '<li>Sugar : ' + req.body.sugar + '</li>'+ '<a href="/addfood"> Back </a>' +
       '<ul class="nav navbar-nav"><li><a href="/">Home</a></li><li><a href="/about">About</a></li><li><a href="/addfood">Add Food</a></li><li><a href="/search">Search Food</a></li><li><a href="/list">Foods List</a></li></ul>')
     }
   });
  });

  app.post("/update-food", function(req,res){
  let sqlquery = "UPDATE food SET calorie=?, carbs=?, fat=?, protein=?, salt=?, sugar=?, unit=? WHERE id = ?";
  let newrecord = [req.body.calorie, req.body.carbs, req.body.fat, req.body.protein, req.body.salt, req.body.sugar, req.body.unit, req.body.id];
  db.query(sqlquery, newrecord, (err, result) => {
    if(err){
       return console.log(err.message);
     }else{
       res.send('<p> Food is updated on database </p>' + '<li> Unit : ' + req.body.unit + '</li>' + '<li> Calorie : ' + req.body.calorie + '</li>' + '<li> Carbs : ' + req.body.carbs + '</li>' + '<li> Fat : ' + req.body.fat + '</li>' + '<li> Protein : ' + req.body.protein + '</li>'+ '<li> Salt : ' + req.body.salt + '</li>'+ '<li>Sugar : ' + req.body.sugar + '</li>'+ '<a href="/search"> Back </a>' +
       '<ul class="nav navbar-nav"><li><a href="/">Home</a></li><li><a href="/about">About</a></li><li><a href="/addfood">Add Food</a></li><li><a href="/search">Search Food</a></li><li><a href="/list">Foods List</a></li></ul>')
     }
   });
  });

  app.post("/delete-food", function(req,res){
      let sqlquery = "DELETE FROM food WHERE id=?";
      let id = [req.body.id];
      db.query(sqlquery, id, (err, result) => {
        if(err){
          return console.lof(err.message);
        }else{
          res.send('<p> Item is succesfully deleted from database </p>' + '<a href="/search"> Back </a>' + '<ul class="nav navbar-nav"><li><a href="/">Home</a></li><li><a href="/about">About</a></li><li><a href="/addfood">Add Food</a></li><li><a href="/search">Search Food</a></li><li><a href="/list">Foods List</a></li></ul>')
        }
      })
  })

  app.get("/search", function(req, res) {
    res.render("search.ejs");
  });

  app.get("/search-result", function(req, res) {
    let word = [req.query.keyword];
    let sqlquery = "SELECT*FROM food WHERE name like ?";

    db.query(sqlquery, word, (err, result) => {
    if(err)
    {
      res.render("search-result.ejs")
    }else{
      res.render("search-result.ejs", {foodresult:result});
    }
    });
  });

  // app.post("/delete", funtion(req, res) {
  //   let sqlquery = "DELETE FROM food WHERE id = ?"
  // })

  app.get("/list", function(req, res) {
    let sqlquery = "SELECT*FROM food ORDER BY name";
  db.query(sqlquery, (err, result)=>{
    if(err) res.render("list.ejs");
    res.render("list.ejs", {availbleFoods: result});
  });
  });

}

// ("Food is added to database, food : " + req.body.name + " unit : " + req.body.unit + " calorie : " + req.body.calorie + " carbs : " + req.body.carbs + " fat : " + req.body.fat + " protein : " + req.body.protein + " salt : " + req.body.salt + " sugar : " + req.body.sugar);
