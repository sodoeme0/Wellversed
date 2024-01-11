const express = require('express');
const router = express.Router();
const volunteerController = require('../controller/volunteerController');

// needed routes
// get(“/”): returns all volunteers
// get(“/volunteer/:id”): return single volunteer
// post(“/login”): returns token volunteer
//post(“/signup”): creates volunteer in db

// get all volunteers
router.get('/', volunteerController.getAllVolunteers)

// get single volunteer
router.get('/volunteer/:email', volunteerController.getVolunteer)

// returns token volunteer
router.route('/login').post(volunteerController.login)

// creates volunteer in db
router.route('/signup').post(volunteerController.signUp)

module.exports = router