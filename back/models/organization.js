const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const organizationSchema = new Schema({
  name: { type: String, required: true },
  ref: { 
    name: String,
    phone: String
  },
  type: { type: String },
  email: { type: String, required: true },
  password: { type: String, required: true },
  about: { type: String },


}); 

organizationSchema.pre("save", function (next) {
  let organization = this;
  if (!organization.isModified("password")) return next();
  bcrypt
    .hash(organization.password, 10)
    .then((hash) => {
      organization.password = hash;
      next();
    })
    .catch((err) => next(error));
});

organizationSchema.methods.comparePassword = function (inputPassword) {
  let organization = this;
  return bcrypt.compare(inputPassword, organization.password);
};

//collection name is stories in the database
module.exports = mongoose.model("Organization", organizationSchema);
