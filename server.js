const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require('dotenv').config()

const router = require("./router");
const auth = require("./middleware/auth.js");
const stdRouter = require("./studentRouter.js");
const cartRouter = require("./cartRouter.js");
const orderRouter = require("./orderRouter.js");
const commentRouter = require("./commentRouter.js");
const userRouter = require("./UserManagement/routes/userRouter.js");
const authRouter = require("./authRoute.js");
const inquiryRouter = require("./inquiryManagement/router/inquiryRouter.js");

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


