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


// TODO: Create route to display a specific Schedule.
router.get("/schedule/:id/", (req, res)=>{
    res.send("This will show the Schedule with id: "+req.params.id);
});

// TODO: Create route to create a Schedule.
router.get("/schedule/new", (req, res)=>{
    res.send("This route will show form to create a new Schedule");
});

router.post("/schedule/", (req, res)=>{
    res.send("This route will create a new Schedule");
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