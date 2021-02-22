/* leaf Controller */
var express = require('express');
var cors = require('cors');
var router = express.Router();

/* Models */
var leafs = require("../model/leaf")
var article = require("../model/article")

// Read by user Id
router.get("/:id", cors(), function(req, res, next) {
    const userId = req.params.id;
    leafs
      .findOne({ id: userId })
      .then(leafs => {
        if (!leafs) return res.status(404).json({ message: "leafs not found" });
        res.status(200).json({
          message: "leafs Detail success",
          data: leafs
        });
      })
      .catch(err => {
        res.status(500).json({
          message: err
        });
      });
  });

  // Update
router.put("/", cors(), function(req, res, next) {
  const { id, root, keyIndexes } = req.body; // 비구조화 할당

  leafs
    .findOne({ id: req.body.id })
    .then(leaf => {
      if (!leaf) return res.status(404).json({message: "leaf not found"});
      leaf.root = req.body.root
      leaf.keyIndexes = req.body.keyIndexes
      leaf.save().then(output => {
        res.status(200).json({
          message: "Update leaf success",
          data: output
        });
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