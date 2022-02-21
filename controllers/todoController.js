var bodyParser = require("body-parser");
var mongoose = require("mongoose");

//connect to database
mongoose.connect(
  // Go to mongo db site and get the url
  // "mongodb://localhost:27017/myapp"
  // replace password with your password and username with username
  "mongodb+srv://<username>:<password>@cluster0.2yxwd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  //If dosent work go to mongodb atlas and add your ip
);
// cretae a schema - this is like a blueprint
var todoSchema = new mongoose.Schema({
  item: String,
});

var Todo = mongoose.model("Todo", todoSchema);
// var itemOne = Todo({
//   item: "get Flowers",
// }).save(function (err) {
//   if (err) throw err;
//   console.log("item saved");
// });

var data = [{ item: "get milk" }, { item: "walk dog" }, { item: "code" }];
var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function (app) {
  app.get("/todo", function (req, res) {
    //get data from mongo db and pass it to the view
    Todo.find({}, function (err, data) {
      if (err) throw err;

      res.render("todo", { todos: data });
    });
  });
  app.post("/todo", urlencodedParser, function (req, res) {
    //get data from the view and add it to mongoDB
    var newTodo = Todo(req.body).save(function (err, data) {
      if (err) throw err;
      res.json(data);
    });

    // data.push(req.body);
    // res.json(data);
  });
  app.delete("/todo/:item", function (req, res) {
    //dete the req. item from mongoDB
    Todo.find({ item: req.params.item.replace(/\-/g, " ") }).remove(function (
      err,
      data
    ) {
      if (err) throw err;
      res.json(data);
    });
    // data = data.filter(function (todo) {
    //   return todo.item.replace(/ /g, "-") !== req.params.item;
    // });
    // res.json(data);
  });
};
