const connectToMongo = require("./db");
const express = require("express");

var cors = require("cors");
const bodyParser = require("body-parser");

connectToMongo();

const app = express();
const server = require("http").Server(app);
const port = process.env.PORT || 5000;

// const corsOptions = {
//   origin: "http://localhost:3000",
//   credentials: true, //access-control-allow-credentials:true
//   optionSuccessStatus: 200,
// };

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false })); //for form post requests
app.use(express.static(`${__dirname}/public`));

// Avaliable routes
app.use(express.json());
app.get("/", (req, res) => {
  res.status(200).send("server working fine");
});
app.use("/api/auth", require("./routes/auth"));
app.use("/api/user", require("./routes/user"));
app.use("/api/questions", require("./routes/questions"));
app.use("/api/scholarships", require("./routes/scholarships"));
app.use("/api/internships", require("./routes/internships"));
app.use("/api/hostels", require("./routes/hostels"));
app.use("/api/projects", require("./routes/projects"));
app.use("/api/FYPs", require("./routes/FYPs"));
app.use("/api/notifications", require("./routes/notifications"));

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
