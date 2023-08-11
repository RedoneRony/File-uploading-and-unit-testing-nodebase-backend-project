const mongoose = require("mongoose");
// coonect database
const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "tools2023",
    });
    console.log(`MongoDb Connected ${conn}`);
  } catch (error) {
    console.log(`Error ${error.message}`);
    process.exit(1);
  }
};
module.exports = { connectDb };
