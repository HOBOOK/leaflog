var express = require('express');
var router = express.Router();

/* Models */
var posts = require("../model/post")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/', function(req, res) {
  res.send('Hello World!');
});

/* Post Controller */
// Create
router.post("/api/posts", function(req, res, next) {
  const { title, content } = req.body; // 비구조화 할당

  console.log(req.body);

  new posts(req.body)
    .save()
    .then(newPost => {
      console.log("Create 완료");
      res.status(200).json({
        message: "Create success",
        data: {
          post: newPost
        }
      });
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: err
      });
    });
});


module.exports = router;
