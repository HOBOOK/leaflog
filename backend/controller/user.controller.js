const User = require('../model/user');
const jwt = require('jsonwebtoken');
const config = require('config');
 
const SECRET_KEY = config.get('secretKey');

/* Models */
let users = require("../model/user")
 
exports.createToken = async function (req, res, next) {
  try {
    const user = await User.find(req.body);
    if (user.length) {
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
      console.log(u)
      if(!u || u.length === 0){
        user.save();
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