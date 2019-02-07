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
        console.log("The results are", results[0]);
    });
});


// TODO: Create route to display a specific Schedule.
router.get("/schedule/:id/", (req, res)=>{

});

// TODO: Create route to create a Schedule.
router.get("/schedule/new", (req, res)=>{

});

router.post("/schedule/", (req, res)=>{

});

// TODO: Create a route to edit a specific Schedule.
router.get("/schedule/:id/edit", (req, res)=>{

});

router.put("/schedule/:id", (req, res)=>{

});
// TODO: Create a route to delete a specific Schedule.
router.delete("/schedule/:id", (req, res)=>{

});


module.exports = router;