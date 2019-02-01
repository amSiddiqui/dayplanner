const express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    dontEnv = require("dotenv").config(),
    mysql = require("mysql");

// Importing Routes 
const indexRoutes = require("./routes/index");

// Setting up database
const db = require("./modules/database");

// Configuring app
app.use(bodyParser.urlencoded({extended: false}));
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));

// Starting routes
app.use(indexRoutes);

// Application listening
app.listen(process.env.PORT, ()=>{
    console.log("Application started at port: "+process.env.PORT);
});