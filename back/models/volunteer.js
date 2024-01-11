const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const volunteerSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  job_title: { type: String,  },
  areas_of_exp: { type: [String] },
  about: String,
  pic: String,
  status: { type: Boolean, default: true },
});

volunteerSchema.pre("save", function (next) {
  let volunteer = this;
  if (!volunteer.isModified("password")) return next();
  bcrypt
    .hash(volunteer.password, 10)
    .then((hash) => {
      volunteer.password = hash;
      next();
    })
    .catch((err) => next(error));
});

volunteerSchema.methods.comparePassword = function (inputPassword) {
  let volunteer = this;
  return bcrypt.compare(inputPassword, volunteer.password);
};

//collection name is stories in the database
module.exports = mongoose.model("Volunteer", volunteerSchema);
