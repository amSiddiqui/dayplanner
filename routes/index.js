const express = require("express"),
    router = express.Router(),
    db = require("../modules/database");

// Landing page
router.get("/", (req, res) => {
    res.render("landing");
});


// TODO: Create route to Show all routes
router.get("/schedule/", (req, res) => {
    db.query("SELECT * from Schedule", (err, results, field) => {
        if (err) {
            res.render("dbError");
            throw err;
        }
        res.render("Schedule/index", {
            schedules: results
        });
    });
});


// Route to create a Schedule.
router.get("/schedule/new/", (req, res) => {
    res.render("Schedule/new");
});

// Route to display a specific Schedule.
router.get("/schedule/:id/", (req, res) => {
    db.query("Select * from Schedule where id = ?", [req.params.id], (err, result, fields) => {
        if (err) {
            res.render("dbError");
            throw err;
        }
        if (result.length == 0) {
            console.log("No result found");
            res.send("no result found");
        } else {
            res.render("Schedule/show", {
                result: result
            });
        }
    });
});

router.post("/schedule/", (req, res) => {
    var activity = req.body.activity;
    var comment = req.body.comment;
    var time_start = formatTime(req.body.time_start);
    var time_end = formatTime(req.body.time_end);
    db.query("insert into Schedule (Activity, Comment, time_start, time_end) values (?, ?, ?, ?)", [activity, comment, time_start, time_end], (err, result, field) => {
        if (err) {
            res.render("dbError");
            throw err;
        }
        if (result.affectedRows > 0) {
            console.log("New scheduel Created with Title: " + activity);
            res.redirect("/schedule/");
        } else {
            console.log("Could not be inserted into database");
            res.redirect("/schedule/");
        }
    });
});

// TODO: Create a route to edit a specific Schedule.
router.get("/schedule/:id/edit", (req, res) => {
    db.query("Select * from Schedule where id = ?", [req.params.id], (err, result, field) => {
        if(err){
            res.render("dbError");
            throw err;
        }
        if(result.length > 0){
            var ts = result[0].time_start;
            var time_start = ts.getDate()+"-"+ts.getDay()+"-"+ts.getFullYear()+"T"+ts.getHours()+":"+ts.getMinutes();
            console.log(time_start);
            console.log(ts);
            res.render("Schedule/edit", {result: result[0]});
        }else{
            res.send("Activity with particular id not found");
        }
    });
});

router.put("/schedule/:id", (req, res) => {
    var activity = req.body.activity;
    var comment = req.body.comment;
    var time_start = formatTime(req.body.time_start);
    var time_end = formatTime(req.body.time_end);
    var query_string = "UPDATE Schedule set Activity=?, Comment=?, time_start=?, time_end=? where id=?";
    db.query(query_string, [activity, comment, time_start, time_end, req.params.id], (err,result, field)=>{
        if (err){
            res.render("dbError");
            throw err;
        }
        if(result.affectedRows > 0){
            console.log("Successfully update entry with id "+req.params.id);
            res.redirect("/schedule/");
        }
        else{
            console.log("Someting went wrong while updating entry");
            res.redirect("/schedule/");
        }
    });
});

// TODO: Create a route to delete a specific Schedule.
router.delete("/schedule/:id", (req, res) => {
    db.query("DELETE FROM Schedule WHERE id=?", [req.params.id], (err, result, field)=>{
        if (err){
            res.render("dbError");
            throw err;
        }
        if(result.affectedRows > 0){
            console.log("Successfully deleted entry with id: "+req.params.id);
            res.redirect("/schedule/");
        }
        else{
            console.log("Something went wrong while deleting. ");
            res.redirect("/schedule/");
        }
    })
});


function formatTime(timeValue) {
    timeValue = timeValue.replace("T", " ");
    timeValue += ":00";
    return timeValue;
}

module.exports = router;