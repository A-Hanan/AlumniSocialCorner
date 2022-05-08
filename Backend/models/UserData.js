const mongoose = require("mongoose");

const UserDataSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      default: "",
    },
    university: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    workExperiences: {
      type: Array,
      default: [],
    },
    educations: {
      type: Array,
      default: [],
    },
    profile: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const UserData = mongoose.model("UserData", UserDataSchema);
module.exports = UserData;
