const Schedule = require("../models/schedule")
const Volunteer = require("../models/volunteer")
const Course = require("../models/course")
const Organization = require("../models/organization")


exports.get = async(req, res)=>{
    // Get all schedules from DB 
    const schedules = await Schedule.find()
    .populate('course')      // Populate the 'course' reference
    .populate('organization')
    .populate('volunteer')
    // If no schedules
    if (!schedules.length) {
        return res.status(400).json({ message: "No schedules found" })
    }

    res.json(schedules)
}


exports.getAllSchedules = async(req, res)=>{
    // Get all schedules from DB 
    let id = req.params.id
    const schedules = await Schedule.find({volunteer: id})
    .populate('course')      // Populate the 'course' reference
    .populate('organization');
    // If no schedules
    if (!schedules.length) {
        return res.status(400).json({ message: "No schedules found" })
    }

    res.json(schedules)
}

exports.getSchedule = async(req,res)=>{
    // Get a schedule from DB
    let id = req.params.id
    console.log(id)
    const schedule = await Schedule.find({ organization: id })
    .populate('course')      // Populate the 'course' reference
    .populate('volunteer');
    //If noschedule
    if (!schedule.length){
        return res.status(400).json({message: "Schedule not found"})
    }
    res.json(schedule)
}

exports.postSchedule = async (req, res) => {
    const { timeframe, status, type, course, organization } = req.body;
   console.log(req.body)
    try {
        // Create a new schedule entry using the provided data
        const newSchedule = new Schedule({
            timeframe,
            status,
            type,
            course,
            
            organization
        });

        // Save the new schedule entry to the database
        const added = await newSchedule.save();

        if (!added) {
            return res.status(400).json({ message: "Failed to add to Schedule" });
        }

        res.status(201).json({ message: "Successfully added to Schedule" });
    } catch (error) {
        console.error("Error adding to schedule:", error);
        res.status(500).json({ error: "An error occurred while adding to the schedule" });
    }
}

exports.pickUpVolunteer = async (req, res) => {
    const { volunteer, scheduleId } = req.body;
        console.log(req.body)
        console.log({volunteer: volunteer, scheduleId: scheduleId})
        const [vol] = await Volunteer.find({email: volunteer})
    try {
        // Find the schedule by ID
        const schedule = await Schedule.findById(scheduleId);

        if (!schedule) {
            return res.status(400).json({ message: "Schedule does not exist" });
        }

        // Update the volunteer variable

        schedule.volunteer = vol;
        schedule.status = true;
        // Save the updated schedule
        const updatedSchedule = await schedule.save();

        if (!updatedSchedule) {
            return res.status(400).json({ message: "Failed to update schedule" });
        }

        res.status(200).json({ message: "Schedule updated successfully" });
    } catch (error) {
        console.error("Error updating schedule:", error);
        res.status(500).json({ error: "An error occurred while updating the schedule" });
    }
};

exports.dropVolunteer = async (req, res) => {
    const id = req.params.id; // Assuming the id is provided in the request parameters
    console.log(req.params)
   
    try {
        // Find the schedule by ID
        const schedule = await Schedule.findById(id);

        if (!schedule) {
            return res.status(400).json({ message: "Schedule does not exist" });
        }

        // Remove the volunteer from the schedule
        schedule.volunteer = null;
        schedule.status = false;

        // Save the updated schedule
        const updatedSchedule = await schedule.save();

        if (!updatedSchedule) {
            return res.status(400).json({ message: "Failed to remove volunteer from schedule" });
        }

        res.status(200).json({ message: "Volunteer removed from schedule successfully" });
    } catch (error) {
        console.error("Error removing volunteer from schedule:", error);
        res.status(500).json({ error: "An error occurred while removing the volunteer from the schedule" });
    }
};