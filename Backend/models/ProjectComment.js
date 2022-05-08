const mongoose = require("mongoose");

const ProjectCommentSchema = new mongoose.Schema(
  {
    projectId: {
      type: String,
      default: "",
      required: true,
    },
    userId: {
      type: String,
      default: "",
      required: true,
    },
    user: {
      type: Object,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ProjectComment = mongoose.model("ProjectComment", ProjectCommentSchema);
module.exports = ProjectComment;
