const mongoose = require("mongoose");

const FYPSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    projectType: {
      type: String,
      required: true,
    },
    projectLink: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    isAlreadyCreated: {
      type: Boolean,
      required: true,
    },
    completionDate: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const FYP = mongoose.model("FYP", FYPSchema);
module.exports = FYP;
