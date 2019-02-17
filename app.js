const express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    methodOvrride = require("method-override"),
    passport = require('passport'),
    session = require('express-session'); 

// Adding Environment variables
require("dotenv").config(); 

// Importing Routes 
const indexRoutes = require("./routes/index"),
    scheduleRoutes = require("./routes/schedule");

// Configuring app
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));
app.use(methodOvrride("_method"));

// Setting up passport session
app.use(session({
    secret: 'The Grand Magus',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());  // Persistent login session

// Database
const db = require("./modules/database");
const Schedule = require("./models/Schedule");
const User = require('./models/User');

require('./modules/passport')(User, passport);

// Authentication Connection to database;
db.sequelize.authenticate()
    .then(()=>{
        console.log("Connected to database successfully");
    })
    .catch(err => {
        console.error("An error occured while connecting ", err);
    });
 
// Synchronizing models
db.sequelize.sync();

// Set user to global level
app.use((req, res, next)=>{
    res.locals.user = req.user;
    next();
});

// Starting routes
app.use(indexRoutes);
app.use("/schedule", scheduleRoutes);

// Application listening
app.listen(process.env.PORT, ()=>{
    console.log("Application started at port: "+process.env.PORT);
});
