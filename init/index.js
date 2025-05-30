const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js");
dotenv = require("dotenv");
dotenv.config();
const MONGO_URL =
  process.env.ATLASDB_URL ||
  "mongodb+srv://vaibhav:LL6kZIgXHfr4POjX@cluster0.cuhenyd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  initdata.data = initdata.data.map((obj) => ({
    ...obj,
    owner: "6821911e299014786740b4a6",
  }));
  await Listing.insertMany(initdata.data);
  console.log("data was initialised");
};

initDB();
