const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/Users");
const { check, validationResult } = require('express-validator');
const config = require("config");
const jwt = require("jsonwebtoken");

// @access  Public
// @desc    Auth Route
// @route   POST api/auth/signUp

router.post("/signUp", [
  check('name', 'Name is required!').not().isEmpty(),
  check('email', 'Enter a valid email!').isEmail(),
  check('password', 'enter a password with length 6 or more!').isLength({
    min: 6,
  }),
], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      res.status(400).json({ errors: [{ msg: 'user already exists' }] });
    }

    user = new User({
      name,
      email,
      password,
    });


    const salt = await bcrypt.genSalt(10);


    user.password = await bcrypt.hash(password, salt);

    await user.save();


    const payload = {
      user: {
        id: user.id
      }
    }

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      {
        expiresIn: 36000
      },
      (err, token) => {
        if (err) throw err;
        res.json({ token });   //send token back to client
      });
  } catch (error) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});


// @access  Public
// @desc    Auth Route
// @route   POST api/auth/signIn

router.post("/signIn", [
  check('email', 'Enter a valid email!').isEmail(),
  check('password', 'enter a password with length 6 or more!').isLength({
    min: 6,
  }),
], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if(!user){
      res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }
    let isMatch = bcrypt.compare(password, user.password);
    
    if(isMatch){

      const payload = {
        user: {
          id: user.id
        }
      }
  
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 36000
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });   //send token back to client
        });
    }else{
      res.status(401).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }
    
  } catch (error) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;