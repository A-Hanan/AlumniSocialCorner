const router = require("express").Router();
const Project = require("../models/Project");
const ProjectComment = require("../models/ProjectComment");
const fetchuser = require("../middleware/fetchuser");
// create a new appointment in the database

router.post("/", async (req, res) => {
  try {
    //console.log(req.body);
    const project = await Project.create(req.body);
    // console.log("body of appointment:", appointment);
    return res.status(200).json(project);
  } catch (err) {
    console.log(err.message);

    return res.status(500).send(err.message);
  }
});

router.post("/submit-comment", async (req, res) => {
  try {
    //console.log(req.body);
    const projectComment = await ProjectComment.create(req.body);
    // console.log("body of appointment:", appointment);
    return res.status(200).json(projectComment);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send(err.message);
  }
});
router.get("/", async (req, res) => {
  try {
    const project = await Project.find({});
    res.status(200).json(project);
  } catch {
    res.status(500).send("internal server error...");
  }
});
router.get("/comments/:projectId", async (req, res) => {
  const { projectId } = req.params;
  try {
    const comments = await ProjectComment.find({ projectId: projectId });
    res.status(200).json(comments);
  } catch {
    res.status(500).send("internal server error...");
  }
});
router.get("/get-my-projects/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const project = await Project.find({ userId });
    // console.log("body of appointment:", appointment);
    return res.status(200).json(project);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send(err.message);
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findOneAndDelete({ _id: id });
    // console.log("body of appointment:", appointment);
    return res.status(200).json(project);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send(err.message);
  }
});
module.exports = router;
