const Course = require("../models/course")
exports.getAllCourses = async(req, res) =>{
    // Get all orgs from DB
    const courses = await Course.find()
    
    // If no orgs
    if (!courses.length) {
        return res.status(400).json({ message: "No orgs found" })
    }

    res.json(courses)
}