const mongoose = require("mongoose");

const mongoURI =
  // "mongodb+srv://abdul:@cluster0.vjjk5.mongodb.net/iamluckyticket?retryWrites=true&w=majority";
  "mongodb://asc:asc11223344@cluster0-shard-00-00.zlokg.mongodb.net:27017,cluster0-shard-00-01.zlokg.mongodb.net:27017,cluster0-shard-00-02.zlokg.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-4enslf-shard-0&authSource=admin&retryWrites=true&w=majority";
const connectToMongo = () => {
  //mongoose.connect(mongoURI).catch((error) => console.log(error));

  mongoose
    .connect(mongoURI, () => {
      console.log("connected to mongoDB");
    })
    .catch((err) => console.log(err, "prrr"));
  // mongoose.connect("", {
  //   useNewUrlParser: true, // Boilerplate for Mongoose 5.x
  // });
  // mongoose.connection.on("connected", () => console.log("Connected"));
  // mongoose.connection.on("error", (err) =>
  //   console.log("Connection failed with - ", err)
  // );
};

module.exports = connectToMongo;
