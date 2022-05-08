const mongoose = require("mongoose");

const InternshipSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
    },
    pay: {
      type: String,
    },

    url: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Internship = mongoose.model("Internship", InternshipSchema);
module.exports = Internship;
