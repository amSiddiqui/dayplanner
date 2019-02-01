const express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    dontEnv = require("dotenv").config(),
    mysql = require("mysql");

// Importing Routes 
const indexRoutes = require("./routes/index");

// Setting up database
const db = require("./modules/database");
const connection = new db();
// Configuring app
app.use(bodyParser.urlencoded({extended: false}));
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));

// Create connection 
connection.connect((err)=>{
    if (err){
        console.error("Error connecting: "+err.stack);
        return;
    }

    console.log("Connected to database as id "+connection.threadId);
});

// Starting routes
app.use(indexRoutes);


// Application listening
app.listen(process.env.PORT, ()=>{
    console.log("Application started at port: "+process.env.PORT);
});