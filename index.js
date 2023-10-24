import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connect } from "mongoose";
import { config } from "dotenv";
import { UserRoute } from "./route/userRoute.js";
import { PostRouter } from "./route/postRoute.js";
config();

const app = express();
const port = 5000;

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(UserRoute);
app.use(PostRouter);
app.get("/", (req, res) => {
  console.log(req);
  return res.json({ message: "Hello" });
});
connect(process.env.MONGO_DB_URL).then(() =>
  app.listen(port, () => {
    console.log(`your app is listen to port https://localhost:${port}`);
  })
);
