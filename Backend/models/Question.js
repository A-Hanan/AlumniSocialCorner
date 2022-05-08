const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    user: {
      type: Object,
    },
    question: {
      type: String,
      default: "",
      required: true,
    },
    description: {
      type: String,
      default: "",
      required: true,
    },
    image: {
      type: String,
      default: "",
      required: true,
    },
    tags: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Question = mongoose.model("Question", QuestionSchema);
module.exports = Question;
