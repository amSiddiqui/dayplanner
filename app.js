const express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    dontEnv = require("dotenv").config(),
    methodOvrride = require("method-override");

// Importing Routes 
const indexRoutes = require("./routes/index");

// Configuring app
app.use(bodyParser.urlencoded({extended: false}));
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));
app.use(methodOvrride("_method"));

// Starting routes
app.use(indexRoutes);

// Application listening
app.listen(process.env.PORT, ()=>{
    console.log("Application started at port: "+process.env.PORT);
});
