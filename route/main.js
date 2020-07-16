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
       res.send("Food is added to database, food : " + req.body.name + " unit : " + req.body.unit + " calorie : " + req.body.calorie + " carbs : " + req.body.carbs + " fat : " + req.body.fat + " protein : " + req.body.protein + " salt : " + req.body.salt + " sugar : " + req.body.sugar);
     }
  });
});
}
