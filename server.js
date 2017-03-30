let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/soccersub2017');

let SoccerSchema = mongoose.Schema({
  level: {type: String, required: true},
  date: {type: String, required: true},
  contact: {type: String, required: true},
  email: {type: String, required: true},
  info: String,
  posted: {type: Date, default: Date.now}
});

let SoccerModel = mongoose.model("SoccerModel", SoccerSchema);

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/api/soccerpost", createPost);
app.get("/api/soccerpost", getAllPosts);
app.get("/api/soccerpost/:id", getPostById);
app.delete("/api/soccerpost/:id", deletePost);
app.put("/api/soccerpost/:id", updatePost);

function updatePost(req, res) {
  let postId = req.params.id;
  let post = req.body;
  SoccerModel
    .update({_id: postId}, {
      level: post.level,
      date: post.date,
      contact: post.contact,
      email: post.email,
      info: post.info,
      posted: post.posted
    })
    .then(
      function(status) {
        res.sendStatus(200);
      },
      function(err) {
        res.sendStatus(400);
      }
    );
}

function getPostById(req, res) {
  let postId = req.params.id;
  SoccerModel
    .findById({_id: postId})
    .then(
      function(post) {
        res.json(post);
      },
      function(err) {
        res.sendStatus(400);
      }
    );
};

function deletePost(req, res) {
  let postId = req.params.id;
  SoccerModel
    .remove({_id: postId})
    .then(
      function () {
        res.sendStatus(200);
      },
      function () {
        res.sendStatus(400);
      }
    );
}

function getAllPosts(req, res) {
  SoccerModel
    .find()
    .then(
      function(posts){
        res.json(posts);
      },
      function(error){
        res.sendStatus(400);
      }
    );
}

function createPost(req, res) {
  let post = req.body;
  console.log(post);
  SoccerModel
    .create(post)
    .then(
      function (obj) {
        res.json(200);
      },
      function (err) {
        res.sendStatus(400);
      }
    );
}


app.listen(3000);
