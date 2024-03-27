const mongoose = require("mongoose");

const db = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.dbUrl);
    console.log("connedted to the database...");
  } catch (error) {
    console.log(error);
  }
};
module.exports = db;