const express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    dontEnv = require("dotenv").config(),
    methodOvrride = require("method-override");
 
// Importing Routes 
const indexRoutes = require("./routes/index"),
    scheduleRoutes = require("./routes/schedule");

// Configuring app
app.use(bodyParser.urlencoded({extended: false}));
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));
app.use(methodOvrride("_method"));

// Database
const db = require("./modules/database");
const Schedule = require("./models/Schedule");
// Authentication Connection to database;
db.sequelize.authenticate()
    .then(()=>{
        console.log("Connected to database successfully");
    })
    .catch(err => {
        console.error("An error occured while connecting ", err);
    });
// Synchronizing models
// db.sequelize.sync();

// Starting routes
app.use(indexRoutes);
app.use("/schedule", scheduleRoutes);

// Application listening
app.listen(process.env.PORT, ()=>{
    console.log("Application started at port: "+process.env.PORT);
});
