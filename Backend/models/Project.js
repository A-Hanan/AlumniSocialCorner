const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },

    deadline: {
      type: String,
      required: true,
    },
    projectType: {
      type: String,
    },
    projectImage: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    tags: {
      type: Array,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", ProjectSchema);
module.exports = Project;
