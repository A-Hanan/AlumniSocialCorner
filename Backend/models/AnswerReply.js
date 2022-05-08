const mongoose = require("mongoose");

const AnswerReplySchema = new mongoose.Schema(
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
    answerId: {
      type: String,
      default: "",
      required: true,
    },

    reply: {
      type: String,
      default: "",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const AnswerReply = mongoose.model("AnswerReply", AnswerReplySchema);
module.exports = AnswerReply;
