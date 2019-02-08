const express = require("express"),
    router = express.Router(),
    db = require("../modules/database");

// Landing page
router.get("/", (req, res)=>{
    res.render("landing");
});


// TODO: Create route to Show all routes
router.get("/schedule/", (req, res)=>{
    db.query("SELECT * from Schedule", (err, results, field)=>{
        if (err){
            res.render("dbError");
            throw err;
        }
        res.render("Schedule/index", {schedules: results});
    });
});


// Route to create a Schedule.
router.get("/schedule/new/", (req, res)=>{
    res.render("Schedule/new");
});

// Route to display a specific Schedule.
router.get("/schedule/:id/", (req, res)=>{
    db.query("Select * from Schedule where id = ?", [req.params.id], (err, result, fields)=>{
        if(err){
            res.render("dbError");
            throw err;
        }
        if(result.length == 0){
            console.log("No result found");
            res.send("no result found");
        }else{
            res.render("Schedule/show", {result: result});
        }
    });
});

router.post("/schedule/", (req, res)=>{
    var activity = req.body.activity;
    var comment = req.body.comment;
    var time_start = req.body.time_start;
    var time_end = req.body.time_end;
    time_start = time_start.replace("T", " ");
    time_start += ":00";
    time_end = time_end.replace("T", " ");
    time_end += ":00";
    db.query("insert into Schedule (Activity, Comment, time_start, time_end) values (?, ?, ?, ?)", [activity, comment, time_start, time_end], (err, result, field)=>{
        if(err){
            res.render("dbError");
            throw err;
        }
        if(result.affectedRows > 0){
            console.log("New scheduel Created with Title: "+activity);
            res.redirect("/schedule/");
        }
        else{
            console.log("Could not be inserted into database");
            res.redirect("/schedule/");
        }
    });
});

// TODO: Create a route to edit a specific Schedule.
router.get("/schedule/:id/edit", (req, res)=>{
    res.send("This route will show from to edit the schedule with id "+req.params.id);
});

router.put("/schedule/:id", (req, res)=>{
    res.send("This route will update the Schedule with id "+req.params.id);
});

// TODO: Create a route to delete a specific Schedule.
router.delete("/schedule/:id", (req, res)=>{
    res.send("This route will delete the Schedule with the id "+req.params.id);
});


module.exports = router;