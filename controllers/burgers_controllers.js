var express = require("express");
var router = express.Router();

// Import the model (burger.js) to use its database functions.
var burger = require("../models/burger.js");

// var burger = require('../models/burger.js');
var models = require('../models');

// Create all our routes and set up logic within those routes where required.

router.get('/', function (req, res){
  // res.redirect('/burgers');
    res.redirect('/index');
});

router.get('/index', function (req, res) {
  models.Burgers.findAll({}).then(function(data){

    var hbsObject = { burgers: data };
   // console.log(data);
    res.render('/index', hbsObject);

  })
});

router.post('/', function (req, res) {
    // Sequelize Query to add new burger to database
  models.Burgers.create(
    {
      name: req.body.name,
      devoured: req.body.devoured
    }
  ).then(function(data){
    //refresh the page
    res.redirect('/index');
  });

});

router.put("/:id", function (req, res) {

  models.Burgers.findOne({
    where:
    {
      id: req.params.id
    }
  })
  .then(function(id) {
  // now update devoured to true
    id.update({
      devoured: req.body.devoured
    })
    // After the burger is updated to the database, refresh the page
    .then(function(){
     res.redirect('/index');
    })
  });

});

// Export routes for server.js to use.
module.exports = router;
