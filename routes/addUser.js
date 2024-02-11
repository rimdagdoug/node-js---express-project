const express = require('express')
const router = express.Router()
var moment = require('moment');
const User= require("../models/customerSchema");





router.get("", (req, res) => {
    res.render("user/add")
  });

router.post("", (req, res) => {
   
    
    User.create(req.body).then(() => {
      res.redirect("/");
    }).catch((err) => {
      console.log(err);
    });
   
  });

  module.exports = router