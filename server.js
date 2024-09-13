const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require('dotenv').config()

const uri = process.env.MONGODB_URI

app.use(cors());
app.use(express.json());

const connect = async () => {
  try {
    await mongoose.connect(uri);
    console.log("DB cunnected");
  } catch (error) {
    console.log("DB connection error: ", error);
  }
};

connect();

const server = app.listen(3001, "127.0.0.1", () => {
  console.log("server is lisining to port: ", server.address().port);
});


