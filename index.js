const express = require("express");
const mongoose = require("mongoose");
const dotEnv = require("dotenv");
const { connectDb } = require("./config/db");
const routes = require("./routes/posts");
const cors = require("cors");

dotEnv.config();

const app = express();
app.use(cors());
app.use(express.json());
connectDb();
app.use("/api", routes);

module.exports = app;

app.get("/", (req, res) => {
  res.send(" Api is running....");
});

// const Port = 8080;
// console.log(Port);
app.listen(8080, console.log("Listening buddy to port ", 8080));
