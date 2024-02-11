const express = require('express')
const router = express.Router()
var moment = require('moment');
const User= require("../models/customerSchema");

//get


router.get("/", (req, res) => {
  
    User.find().then((result) => {
      
      res.render("index", {arr: result , moment: moment});

    }).catch((err) => {
      console.log(err)
    })
    
      
    });
  




 // app.get("/user/view.html", (req, res) => {
    //res.render("user/view")
  //});

router.get("/edit/:id", (req, res) => {
    User.findById(req.params.id).then((result) => {
      res.render("user/edit", {obj: result, moment: moment})
    }).catch((err) => {
      console.log(err)
    })
    
  });

router.get("/view/:id", (req, res) => {
    // result ==> object
    User.findById(req.params.id)
      .then((result) => {
        res.render("user/view", { obj: result, moment: moment });
      })
      .catch((err) => {
        console.log(err);
      });
  });


  //post



router.post("/search", (req, res) => {
   
    console.log("------------------------")
    const searchText = req.body.searchText.trim();
    User.find({ $or: [{firstName: searchText}, {lastName: searchText}]}).then((result) => {
     console.log(result)
      res.render("user/search", {arr: result , moment: moment})
    }).catch((err) => {
      console.log(err);
    });
   
  });


  // delete request
router.delete("/edit/:id", (req, res) => {

    User.findByIdAndDelete(req.params.id).then(() => {
      res.redirect("/");

    }).catch((err) => {
      console.log(err)
    })

  });
// put request
router.put("/edit/:id" , (req,res) => {
    
    User.findByIdAndUpdate(req.params.id, req.body).then((result) => {
      
      res.redirect("/")
    }).catch((err) => {
      console.log(err)
    })
  });


module.exports = router