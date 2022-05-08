const mongoose = require("mongoose");

const ScholarshipSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    country: {
      type: String,
    },
    duration: {
      type: String,
    },
    amount: {
      type: String,
    },
    deadline: {
      type: String,
      required: true,
    },
    scholarshipFor: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Scholarship = mongoose.model("Scholarship", ScholarshipSchema);
module.exports = Scholarship;
