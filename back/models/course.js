const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const courseSchema = new Schema({
  name: { type: String, required: true },
  desc: { type: String, required: true},
  type: {type: String}
  
});





//collection name is stories in the database
module.exports = mongoose.model("Course", courseSchema);
