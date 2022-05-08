const mongoose = require("mongoose");

const HostelSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    hostelImage: {
      type: String,
    },
    hostelName: {
      type: String,
      required: true,
    },
    location: {
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
    },
  },
  {
    timestamps: true,
  }
);

const Hostel = mongoose.model("Hostel", HostelSchema);
module.exports = Hostel;
