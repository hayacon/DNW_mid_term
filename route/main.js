module.exports = function(app) {
// Route to display home page.no input. output is home.ejs template file.
 app.get("/", function(req, res) {
   res.render("home.ejs");
 });
// Route to display about page.no input. output is about.ejs template file.
 app.get("/about", function(req, res) {
   res.render("about.ejs");
 });
// Route to display add food page.no input. output is addfood.ejs template file.
 app.get("/addfood", function(req, res) {
   res.render("addfood.ejs");
 });

/* This route is for inserting new data set comes from front-end. Input is 8 items: name, unit, calorie, carbs, fat, protein, salt, and sugar from form on addfood.ejs, and it output result of this process.
*/
  app.post("/foodadded", function(req,res){
  /* This interaction is to add new set of data into the database.
  It takes 8 items from user as a input, and add them to the apropriate location on database
  */
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

/* This route is for user to update existing data on the database. Input is values from a form on search-result.ejs : id, unit, calorie, carbs, fat, protein, salt, sugar, and output is result of process.
*/
  app.post("/update-food", function(req,res){
  /*This interaction is for user to update existing data on the database. Input is id, unit, calorie, carbs, fat, protein, salt, sugar).It find apropriate location on the dabase based on given id and update it with input values */
    let sqlquery = "UPDATE food SET calorie=?, carbs=?, fat=?, protein=?, salt=?, sugar=?, unit=? WHERE id = ?";
    let newrecord = [req.body.calorie, req.body.carbs, req.body.fat, req.body.protein, req.body.salt, req.body.sugar, req.body.unit, req.body.id];

    db.query(sqlquery, newrecord, (err, result) => {
      if(err){
         return console.log(err.message);
       }else{
         res.send('<p> Food is now updated on database </p>' + '<li> Unit : ' + req.body.unit + '</li>' + '<li> Calorie : ' + req.body.calorie + '</li>' + '<li> Carbs : ' + req.body.carbs + '</li>' + '<li> Fat : ' + req.body.fat + '</li>' + '<li> Protein : ' + req.body.protein + '</li>'+ '<li> Salt : ' + req.body.salt + '</li>'+ '<li>Sugar : ' + req.body.sugar + '</li>'+ '<a href="/search"> Back </a>' +
         '<ul class="nav navbar-nav"><li><a href="/">Home</a></li><li><a href="/about">About</a></li><li><a href="/addfood">Add Food</a></li><li><a href="/search">Search Food</a></li><li><a href="/list">Foods List</a></li></ul>')
       }
     });
  });

/* This route is for deleting a data from the database.
This route takes id as a input and output the result of deleting process. */
  app.post("/delete-food", function(req,res){
    /*This interaction for deleting a set of values from the database.
    This interaction only need id as a input, and it deletes all values/items with that id*/
      let sqlquery = "DELETE FROM food WHERE id=?";
      let id = [req.body.id];

      db.query(sqlquery, id, (err, result) => {
        if(err){
          return console.log(err.message);
        }else{
          res.send('<p> Item was succesfully deleted from database </p>' + '<a href="/search"> Back </a>' + '<ul class="nav navbar-nav"><li><a href="/">Home</a></li><li><a href="/about">About</a></li><li><a href="/addfood">Add Food</a></li><li><a href="/search">Search Food</a></li><li><a href="/list">Foods List</a></li></ul>')
        }
      })
  })

  // Route to display search page.no input. output is search.ejs template file.
  app.get("/search", function(req, res) {
    res.render("search.ejs");
  });

// Route to search data on the database.Input is a keyword from user on searching form on search.ejs and output search result.
  app.get("/search-result", function(req, res) {
    /*This interaction for select item that matches user's input from the database. Input is keyword from user and output is set of values if there is any match. */
      let sqlquery = "SELECT*FROM food WHERE name like ?";
      let word = [req.query.keyword];

      db.query(sqlquery, word, (err, result) => {
      if(err)
      {
        res.render("search-result.ejs")
      }else{
        res.render("search-result.ejs", {foodresult:result});
      }
      });
  });

/*This route is for get all existing data from the data. There is not input. Output is all values on the dataset. */
  app.get("/list", function(req, res) {
    /*This interaction simply get all data form the database. With no input, it just output akk data and values.*/
    let sqlquery = "SELECT*FROM food ORDER BY name";
    
    db.query(sqlquery, (err, result)=>{
      if(err) res.render("list.ejs");
      res.render("list.ejs", {availbleFoods: result});
    });
  });

/*This route is for getting data with certain ids from the database.
Input is ids, and output is all values that match input id. */
  app.get("/counter", function(req, res) {
    /*This interaction select all data that match ids from user. Input is ids (can be multiple id) and it output all data with input ids*/
    let sqlquery = "SELECT * FROM food WHERE id IN(?)";
    let foods = [];
    let id = [req.query.id];

    db.query(sqlquery, id, (err, result) => {
      if(err){
        return console.log(err.message);
      }else{
        res.render("counter.ejs", {checkedFood: result.name});
      }
    })
  })
}
