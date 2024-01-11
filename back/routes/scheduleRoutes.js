const express = require('express')
const router = express.Router()
const scheduleController = require('../controller/scheduleController')
// router strings must start with back slash unless will get err: canont get xyz
//before: router.get('volunteer/:id', scheduleController.getAllSchedules) 
// after: router.get('/volunteer/:id', scheduleController.getAllSchedules) 

//return all schedules correlating to volunteer
router.get('/volunteer/:id', scheduleController.getAllSchedules) 

router.get('/', scheduleController.get) 

//return all schedules correlating to organization
router.get('/organization/:id', scheduleController.getSchedule)

//create schedule

router.post('/create', scheduleController.postSchedule)

// add volunteer to schedule

router.put('/pickup', scheduleController.pickUpVolunteer)

// remove volunteer from schedule
   
router.put('/drop/:id', scheduleController.dropVolunteer)

module.exports = router 