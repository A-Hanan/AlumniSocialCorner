const router = require("express").Router();
const Scholarship = require("../models/Scholarship");
const fetchuser = require("../middleware/fetchuser");
// create a new appointment in the database

router.post("/", async (req, res) => {
  try {
    //console.log(req.body);
    const scholarship = await Scholarship.create(req.body);
    // console.log("body of appointment:", appointment);
    return res.status(200).json(scholarship);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send(err.message);
  }
});
router.get("/", async (req, res) => {
  try {
    const scholarships = await Scholarship.find({});
    res.status(200).json(scholarships);
  } catch {
    res.status(500).send("internal server error...");
  }
});
router.get("/get-my-scholarships/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const scholarships = await Scholarship.find({ userId });
    // console.log("body of appointment:", appointment);
    return res.status(200).json(scholarships);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send(err.message);
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const scholarship = await Scholarship.findOneAndDelete({ _id: id });
    // console.log("body of appointment:", appointment);
    return res.status(200).json(scholarship);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send(err.message);
  }
});

module.exports = router;
