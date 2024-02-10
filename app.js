const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose');
app.use(express.urlencoded({ extended: true }));
const User= require("./models/customerSchema")
app.set('view engine', 'ejs')
app.use(express.static('public'))
var moment = require('moment');
var methodOverride = require('method-override')
app.use(methodOverride('_method'))


//auto refresh 
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));
 
 
const connectLivereload = require("connect-livereload");
app.use(connectLivereload());
 
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

//get


  app.get("/", (req, res) => {
  
    User.find().then((result) => {
      
      res.render("index", {arr: result , moment: moment});

    }).catch((err) => {
      console.log(err)
    })
    
      
    });

   
  


  
  app.get("/user/add.html", (req, res) => {
    res.render("user/add")
  });

  

 // app.get("/user/view.html", (req, res) => {
    //res.render("user/view")
  //});

  app.get("/edit/:id", (req, res) => {
    User.findById(req.params.id).then((result) => {
      res.render("user/edit", {obj: result, moment: moment})
    }).catch((err) => {
      console.log(err)
    })
    
  });

  app.get("/view/:id", (req, res) => {
  
    User.deleteOne({ _id: req.params.id }).then((result) => {
      
      res.render("user/view", {obj: result , moment: moment});

    }).catch((err) => {
      console.log(err)
    })
    
      
    });


  //post

  app.post("/user/add.html", (req, res) => {
   
    
    User.create(req.body).then(() => {
      res.redirect("/");
    }).catch((err) => {
      console.log(err);
    });
   
  });

  // delete request
  app.delete("/edit/:id", (req, res) => {

    User.findByIdAndDelete(req.params.id).then(() => {
      res.redirect("/");

    }).catch((err) => {
      console.log(err)
    })

  });
// put request
  app.put("/edit/:id" , (req,res) => {
    
    User.findByIdAndUpdate(req.params.id, req.body).then((result) => {
      
      res.redirect("/")
    }).catch((err) => {
      console.log(err)
    })
  });



  
  

//conexion
mongoose.connect("mongodb+srv://rimdagdoug99:oaLMWppajct6KjLs@cluster0.xlcvrpf.mongodb.net/all-data?retryWrites=true&w=majority")
.then(() => {
    app.listen(port, () => {
      console.log('http://localhost:${port}/');
    });
  })
  .catch((err) => {
    console.log(err);
  
  });

 
