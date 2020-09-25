/* leaf Controller */
var express = require('express');
var cors = require('cors');
var router = express.Router();

/* Models */
var leafs = require("../model/leaf")

// Read by user Id
router.get("/:id", cors(), function(req, res, next) {
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