const mongoose = require("mongoose");

const HostelRatingSchema = new mongoose.Schema(
  {
    hostelId: {
      type: String,
      default: "",
      required: true,
    },
    userId: {
      type: String,
      default: "",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const HostelRating = mongoose.model("HostelRating", HostelRatingSchema);
module.exports = HostelRating;
