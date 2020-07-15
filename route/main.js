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
     res.send(req.body)
   });
}
