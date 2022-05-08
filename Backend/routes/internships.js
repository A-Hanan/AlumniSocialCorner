const router = require("express").Router();
const Internship = require("../models/Internship");
const fetchuser = require("../middleware/fetchuser");
// create a new appointment in the database

router.post("/", async (req, res) => {
  try {
    //console.log(req.body);
    const internship = await Internship.create(req.body);
    // console.log("body of appointment:", appointment);
    return res.status(200).json(internship);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send(err.message);
  }
});
router.get("/", async (req, res) => {
  try {
    const internship = await Internship.find({});
    res.status(200).json(internship);
  } catch {
    res.status(500).send("internal server error...");
  }
});
router.get("/get-my-internships/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const internship = await Internship.find({ userId });
    // console.log("body of appointment:", appointment);
    return res.status(200).json(internship);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send(err.message);
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const internship = await Internship.findOneAndDelete({ _id: id });
    // console.log("body of appointment:", appointment);
    return res.status(200).json(internship);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send(err.message);
  }
});

module.exports = router;
