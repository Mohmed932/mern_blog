import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
// import path from "path";
import { connect } from "mongoose";
import { config } from "dotenv";
import { UserRoute } from "./route/userRoute.js";
import { PostRouter } from "./route/postRoute.js";
config();

// const getUploadPath = () => {
//   const currentModulePath = new URL(import.meta.url).pathname;
//   const fullPath = path.resolve(currentModulePath);

//   // نقطع المسار الكامل إلى مكونات الدليل
//   const fullPathArray = fullPath.split(path.sep);

//   // نقوم بإزالة المكونين الأخيرين من المسار
//   const modifiedPathArray = fullPathArray.slice(0, -2); // -2 بدلاً من -1

//   // نقوم بدمج المكونات المعدلة مع مجلد "uploads"
//   const modifiedPath = path.join(...modifiedPathArray, "uploads");

//   return modifiedPath;
// };

// console.log(getUploadPath());

const app = express();
const port = 5000;
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(UserRoute);
app.use(PostRouter);
app.use("/uploads", express.static("./uploads"));
connect(process.env.MONGO_DB_URL).then(() =>
  app.listen(port, () => {
    console.log(`your app is listen to port https://localhost:${port}`);
  })
);
