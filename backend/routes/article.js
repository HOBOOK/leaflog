/* article Controller */

var express = require('express');
var cors = require('cors');
var router = express.Router();

/* Models */
var articles = require("../model/article")

// Create
router.post("/", cors(), function(req, res, next) {
    const { title, content, author, thunbmail, private, prominent, water } = req.body; // 비구조화 할당
  
    console.log(req.body);
  
    new articles(req.body)
      .save()
      .then(newArticle => {
        console.log("Create 완료 > " + newArticle);
        res.status(200).json({
          message: "Create success",
          data: {
            article: newArticle
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
  router.get("/", cors(), function(req, res, next) {
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

  // Read All By Id
  router.get("/:id", cors(), function(req, res, next) {
    let id = req.params.id;
    let page = Math.max(1, req.query.page);
    var limit = 10;
    articles.countDocuments({ author: id }, (err,count) => {
      if(err) return res.json({success:false, message:err});
      var skip = (page-1) * limit;
      var maxPage = Math.ceil(count/limit);
      if(page > maxPage) return res.json({success:false, message: "last"});
      articles
        .find({author: id})
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
  router.get("/:id/:article", cors(), function(req, res, next) {
    articles
      .findOne({ author: req.params.id, title: req.params.article })
      .then(article => {
        if (!article) return res.status(404).json({ message: "article not found" });
        console.log("success get article -> " + article);
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

  // Delete
  router.delete("/:id/:article", cors(), function(req, res, next) {
    articles
      .deleteOne({ author: req.params.id, title: req.params.article })
      .then(output => {
        if (output.n === 0) return res.status(404).json({ message: "article not found" });
        console.log("success delete article");
        res.status(200).json({
          message: "article delete success"
        });
      })
      .catch(err => {
        res.status(500).json({
          message: err
        });
      });
  });

  module.exports = router;
  