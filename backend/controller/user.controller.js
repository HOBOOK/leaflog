const User = require('../model/user');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
 
const SECRET_KEY = config.get('secretKey');

/* Models */
let users = require("../model/user")
const Leaf = require('../model/leaf');
 
exports.createToken = async function (req, res, next) {
  try {
    let pwd = req.body.password;
    delete req.body.password
    const user = await User.find(req.body);
    if (user.length && bcrypt.compareSync(pwd, user[0].password)) {
      const token = jwt.sign({
        id: user[0].id
      }, SECRET_KEY, {
        expiresIn: '1h'
      });
 
      res.cookie('user', token);
      res.status(201).json({
        result: 'ok',
        token
      });
    } else {
      res.status(400).json({ error: 'invalid user' });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};
 
exports.createNewUser = async function (req, res, next) {
  try {
    const user = await new User(req.body)
    const leaf = await new Leaf(req.body)
    await users
    .find({ 
      $or: [{
        email: user.email
      },
      {
        id: user.id
      }] 
    })
    .then((u)=>{
      if(!u || u.length === 0){
        user.save();
        leaf.save();
        res.status(201).json({
          result: 'ok',
          user: user
        });
      }else{
        res.status(409).json({
          message: '이미 존재하는 닉네임입니다.',
          data: null
        });
      }
    })
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.updateUser = async function (req, res, next) {
  try {
    const user = await new User(req.body)
    await users
    .find({ 
      $or: [{
        email: user.email
      },
      {
        id: user.id
      }] 
    })
    .then((u)=>{
      if(u){
        u[0].name = user.name
        u[0].avatar = user.avatar
        u[0].save();
        res.status(201).json({
          result: 'ok',
          user: u[0]
        });
      }
    })
  } catch (err) {
    console.error(err);
    next(err);
  }
};