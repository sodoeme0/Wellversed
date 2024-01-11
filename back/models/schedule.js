const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const scheduleSchema = new Schema({
  timeframe: { type: Date, required: true },
  status: { type: Boolean, required: true, default:false},
  type: {type: String},
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
},
volunteer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Volunteer'
},
organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization'
}
  
});





//collection name is stories in the database
module.exports = mongoose.model("Schedule", scheduleSchema);
