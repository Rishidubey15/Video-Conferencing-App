import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import mongoose, { set } from "mongoose";
import cors from "cors";
import {connectToSocket} from "./controllers/socketManager.js";
import userRoutes from "./routes/user.routes.js"

const app = express();
const server = createServer(app);
const io = connectToSocket(server);
app.set("port", (process.env.PORT || 8000));
app.use(cors());
app.use(express.json({limit: "40kb"}));
app.use(express.urlencoded({limit: "40kb", extended: true}))

app.use("/api/v1/users", userRoutes);

const start = async () => {
  const connectionDb = await mongoose.connect("mongodb+srv://RishiDubey:videoZoom@cluster0.zgo5a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
  console.log(`Connected to mongodb: ${connectionDb}`);
  server.listen(app.get("port"), () => {
    console.log(`Server is running on port ${app.get("port")}`);
  });
};

start();