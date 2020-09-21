var express = require('express');
var cors = require('cors');
var router = express.Router();

/* Models */
var articles = require("../model/article")
var leafs = require("../model/leaf")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/', function(req, res) {
  res.send('Hello World!');
});

/* article Controller */
// Create
router.post("/api/articles", function(req, res, next) {
  const { title, content } = req.body; // 비구조화 할당

  console.log(req.body);

  new articles(req.body)
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

// Read All
router.get("/api/articles", cors(), function(req, res, next) {
  let page = Math.max(1, req.query.page);
  var limit = 10;

  articles.countDocuments({}, (err,count) => {
    if(err) return res.json({success:false, message:err});
    var skip = (page-1) * limit;
    var maxPage = Math.ceil(count/limit);
    if(page > maxPage) return res.json({success:false, message: "last"});
    articles
      .find()
      .skip(skip)
      .limit(limit)
      .then(articles => {
        console.log("articles Read All 완료 " + articles.length);
        res.status(200).json({
          message: articles.length < limit ? "last" : "Read All success",
          data: {
            articles
          }
        });
      })
      .catch(err => {
        res.status(500).json({
          message: err
        });
      });
  })
});

// Read by id
router.get("/api/articles:article_id", cors(), function(req, res, next) {
  const articleId = req.params.article_id;

  articles
    .findOne({ _id: articleId })
    .then(post => {
      if (!post) return res.status(404).json({ message: "article not found" });
      console.log("Read Detail 완료");
      res.status(200).json({
        message: "article Detail success",
        data: {
          article: article
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        message: err
      });
    });
});

/* leaf Controller */
// Read by user Id
router.get("/api/leafs/:id", cors(), function(req, res, next) {
  const userId = req.params.id;
  console.log(userId)
  leafs
    .findOne({ id: userId })
    .then(leafs => {
      if (!leafs) return res.status(404).json({ message: "leafs not found" });
      console.log("Read Detail 완료");
      res.status(200).json({
        message: "leafs Detail success",
        data: {
          leafs: leafs
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        message: err
      });
    });
});

module.exports = router;
