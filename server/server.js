var express = require('express');
var app = express();
var api = require('./api/api');//api folder
var config = require('./config/config');//database connec
var mongoose = require('mongoose');  
var morgan = require('morgan');
var bodyParser = require('body-parser');
// connect to mongoDB database 
mongoose.connect(config.db.url); //connecting to mongo db 
//Set - up global middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//In a large application, 
//things could easily get out of control 
//if we keep adding code to a single 
//JavaScript file (server.js).
// So  move the routes-related code 
//into  api module .
app.use('/api/', api);
//app.use('/users/', user);
app.use(function(err, req,res,next){
    console.error(err.stack)
    res.status(500).send("Error 500!")
});

// export the app for testing
module.exports = app;
