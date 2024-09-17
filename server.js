const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cloudinary = require("cloudinary").v2;
const Multer = require("multer");
const busboy = require("busboy");

const router = require("./router");
const auth = require("./middleware/auth.js");
const stdRouter = require("./studentRouter.js");
const cartRouter = require("./cartRouter.js");
const orderRouter = require("./orderRouter.js");
const commentRouter = require("./commentRouter.js");
const userRouter = require("./UserManagement/routes/userRouter.js");
const authRouter = require("./authRoute.js");
const inquiryRouter = require("./inquiryManagement/router/inquiryRouter.js");
const empLoginRouter = require("./EmployeeManagement/route/login.route.js");
const taskRouter = require("./EmployeeManagement/route/task.route.js");
const attendanceRouter = require("./EmployeeManagement/route/attendance.route.js");
const employeeRouter = require("./EmployeeManagement/route/employee.route.js");

const uri = process.env.MONGODB_URI;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const storage = new Multer.memoryStorage();
const upload = Multer({
  storage,
});

async function handleUpload(file) {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  return res;
}

app.use(cors());
app.use(express.json());
app.use(cookieParser());

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

app.post("/upload", upload.single("my_file"), async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    const cldRes = await handleUpload(dataURI);
    res.json(cldRes);
  } catch (error) {
    console.log(error);
    res.send({
      message: error.message,
    });
  }
});


//user management
app.use("/api", router);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/student", auth, stdRouter);
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);


//inquiry management
app.use("/api/comment", commentRouter);
app.use("/api/inquiry", inquiryRouter);

//employee management
app.use("/api/emp/login", empLoginRouter);
app.use("/api/emp", employeeRouter);
app.use("/api/tasks", taskRouter);
app.use("/api/attendance", attendanceRouter);


