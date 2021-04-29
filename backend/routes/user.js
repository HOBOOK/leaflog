/* leaf Controller */
const express = require('express');
const cors = require('cors');
let router = express.Router();
const transport = require('../plugins/mail.transport')
const usersController = require('../controller/user.controller');

/* Models */
let users = require("../model/user")

router.post('/login', usersController.createToken);
router.post('/new', usersController.createNewUser);
//회원가입 인증 메일
router.post('/email/signup', (req, res, next) => {

  const email = req.body

  transport.sendMail({
    from: `leeflog <hobookmanager@gmail.com>`,
    to: email.to,
    subject: 'leeflog 회원가입 인증',
    text: 'text',
    html: `
      <div style="text-align: center;">
        <h3 style="color: #FA5882">ABC</h3>
        <br />
        <p>text</p>
      </div>
    `})
    .then(res => res.json(send))
    .catch(err => next(err))
})

// Read by user Id
router.get("/:id", cors(), function(req, res, next) {
    const userId = req.params.id;
    users
      .findOne({ id: userId })
      .then(users => {
        if (!users) return res.status(404).json({ message: "users not found" });
        console.log("Read Detail 완료");
        res.status(200).json({
          message: "users Detail success",
          data: users
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

  users
    .findOne({ id: req.body.id })
    .then(leaf => {
      if (!user) return res.status(404).json({message: "user not found"});
      user.root = req.body.root
      user.keyIndexes = req.body.keyIndexes
      user.save().then(output => {
        console.log("success update users > " + user);
        res.status(200).json({
          message: "Update user success",
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