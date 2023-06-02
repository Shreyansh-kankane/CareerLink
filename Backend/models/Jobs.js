const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  postedBy:{
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  duration: {
    type: String
  },
  salary: {
    type: String
  },
  requirements: {
    type: String
  },
  datePosted: {
    type: Date,
    default: Date.now
  },
  deadline: {
    type: String
  }
});

const Jobs = mongoose.model("Job", jobSchema);
module.exports = Jobs;
