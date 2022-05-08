const mongoose = require("mongoose");

const AnswerSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      default: "",
      required: true,
    },
    user: {
      type: Object,
      required: true,
    },
    questionId: {
      type: String,
      default: "",
      required: true,
    },
    question: {
      type: Object,
      required: true,
    },
    answer: {
      type: String,
      default: "",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Answer = mongoose.model("Answer", AnswerSchema);
module.exports = Answer;
