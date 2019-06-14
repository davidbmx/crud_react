const express = require('express');
const debug = require('debug')('crud-react:users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();

const Users = require('../models/UsersModel');
const SECRET_KEY = process.env.SECRET_KEY || 'secret';

/**
 * Generate token jwt
 * @param {*} data 
 */
const token = (data) =>  jwt.sign(data, SECRET_KEY, {expiresIn: "1h"});

/**
 * Middleware to validate data
 */
router.use((req, res, next) => {
  errors = {};
  if (!req.body.username) {
    errors.username = 'This field is required';
  }

  if (!req.body.password) {
    errors.password = 'This field is required';
  }

  if (errors.username || errors.password) {
    return res.status(401).json(errors);
  }

  next();
});

/* login users  */
router.post('/login', async (req, res, next) => {
  const user = await Users.find({ username: req.body.username }).exec();
  if (user.length !== 1) {
    return next(401);
  }

  bcrypt.compare(req.body.password, user[0].password, (error, result) => {
    if (error || !result) {
      return next(401);
    }

    const data = {
      username: user[0].username,
      roles: user[0].roles,
      _id: user[0]._id
    };

    return res.status(200).json({
      username: user[0].username,
      roles: user[0].roles,
      token: token(data)
    });
  });
});

/**
 * Middleware respond error message
 */
router.use((err, req, res, next) => {
  if (err) {
    return res.status(err).json({
      error: 'Incorrect username or password'
    });
  }
  next();
});

module.exports = router;
