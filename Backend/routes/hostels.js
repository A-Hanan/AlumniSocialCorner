const router = require("express").Router();
const Hostel = require("../models/Hostel");
const HostelRating = require("../models/HostelRating");
const fetchuser = require("../middleware/fetchuser");
// create a new appointment in the database

router.post("/", async (req, res) => {
  try {
    //console.log(req.body);
    const hostel = await Hostel.create(req.body);
    // console.log("body of appointment:", appointment);
    return res.status(200).json(hostel);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send(err.message);
  }
});

router.post("/submit-rating", async (req, res) => {
  try {
    //console.log(req.body);
    const hostelRating = await HostelRating.create(req.body);
    // console.log("body of appointment:", appointment);
    return res.status(200).json(hostelRating);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send(err.message);
  }
});
router.get("/", async (req, res) => {
  try {
    const hostels = await Hostel.find({});
    res.status(200).json(hostels);
  } catch {
    res.status(500).send("internal server error...");
  }
});
router.get("/ratings/:hostelId", async (req, res) => {
  const { hostelId } = req.params;
  try {
    const ratings = await HostelRating.find({ hostelId: hostelId });
    res.status(200).json(ratings);
  } catch {
    res.status(500).send("internal server error...");
  }
});
router.get("/get-my-hostels/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const hostel = await Hostel.find({ userId });
    // console.log("body of appointment:", appointment);
    return res.status(200).json(hostel);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send(err.message);
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const hostel = await Hostel.findOneAndDelete({ _id: id });
    // console.log("body of appointment:", appointment);
    return res.status(200).json(hostel);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send(err.message);
  }
});
module.exports = router;
