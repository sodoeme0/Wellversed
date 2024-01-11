const express = require('express')
const router = express.Router()
const courseController = require('../controller/courseController')


//get all courses
router.get('/', courseController.getAllCourses)



  
module.exports = router