const router = require("express").Router();
const FYP = require("../models/FYP");
const fetchuser = require("../middleware/fetchuser");
// create a new appointment in the database

router.post("/", async (req, res) => {
  try {
    //console.log(req.body);
    const fyp = await FYP.create(req.body);
    // console.log("body of appointment:", appointment);
    return res.status(200).json(fyp);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send(err.message);
  }
});
router.get("/new", async (req, res) => {
  try {
    const fyp = await FYP.find({ isAlreadyCreated: false });
    res.status(200).json(fyp);
  } catch {
    res.status(500).send("internal server error...");
  }
});
router.get("/already-created", async (req, res) => {
  try {
    const fyp = await FYP.find({ isAlreadyCreated: true });
    res.status(200).json(fyp);
  } catch {
    res.status(500).send("internal server error...");
  }
});
router.get("/get-my-scholarships/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const fyp = await FYP.find({ userId });
    // console.log("body of appointment:", appointment);
    return res.status(200).json(fyp);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send(err.message);
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const fyp = await FYP.findOneAndDelete({ _id: id });
    // console.log("body of appointment:", appointment);
    return res.status(200).json(fyp);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send(err.message);
  }
});

module.exports = router;
