const express = require("express"),
    router = express.Router(),
    db = require("../modules/database"),
    Schedule = require("../models/Schedule");


// Route to Show all routes
router.get("/", isLoggedIn, (req, res) => {
    Schedule.findAndCountAll().then(result => {
        console.log("Number of results "+result.count);
        res.render("Schedule/index", {schedules: result.rows});
    }).catch(err=>{
        console.error("An error occured while quering data ", err);
        res.render("dbError");
    });
});


// Route to create a Schedule.
router.get("/new/", isLoggedIn, (req, res) => {
    res.render("Schedule/new");
});

// Route to display a specific Schedule.
router.get("/:id/", isLoggedIn, (req, res) => {
    Schedule.findByPk(req.params.id).then(result => {
        res.render("Schedule/show", {result: result});
    }).catch(err =>{
        res.render("dbError");
        console.error("An error occured while finding Schedule");
    });
});

router.post("/", isLoggedIn, (req, res) => {
    var activity = req.body.activity;
    var comment = req.body.comment;
    var time_start = req.body.time_start;
    var time_end = req.body.time_end;
    Schedule.create({
        Activity: activity,
        Comment: comment,
        time_start: time_start,
        time_end: time_end
    }).then(schedule =>{
        console.log("Added new Schedule to the database");
        console.log(schedule);
        res.redirect("/schedule/");
    }).catch(err =>{
        res.render("dbError");
        console.error(err);
    });
});

// Route to edit a specific Schedule.
router.get("/:id/edit", isLoggedIn, (req, res) => {
    Schedule.findByPk(req.params.id).then(result =>{
        if(result){
            res.render("Schedule/edit", {result: result.dataValues});
        }else{
            console.log("Wrong ID ERROR");
            res.send("Schedule with id: "+req.params.id+" does not exits");
        }
    }).catch(err =>{
        console.error(err);
        res.render("dbError");
    });
});

router.put("/:id", isLoggedIn, (req, res) => {
    var activity = req.body.activity;
    var comment = req.body.comment;
    var time_start = req.body.time_start;
    var time_end = req.body.time_end;
    Schedule.update({
        Activity: activity,
        Comment: comment,
        time_start: time_start,
        time_end: time_end
    }, {
        where:{
            id: req.params.id
        }
    }).then(affectedCount =>{
        if (affectedCount){
            res.redirect("/schedule/");
        }else{
            console.log("Something went wrong");
            res.redirect("/schedule/");
        }
    });
});

// Route to delete a specific Schedule.
router.delete("/:id", isLoggedIn, (req, res) => {
    Schedule.destroy({
        where: {
            id: req.params.id
        }
    }).then(affectedCount=>{
        if(affectedCount){
            console.log("Affected Rows: "+affectedCount);
            res.redirect("/schedule/");
        }else{
            console.log("Something went wrong while deleting.");
        }
    }).catch(err=>{
        console.error("Something went wrong while deleting: ", err);
        res.render("dbError");
    });
});


function isLoggedIn (req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

module.exports = router;