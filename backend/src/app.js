import "dotenv/config";
import express from "express";
import { createServer } from "node:http";
import mongoose, { set } from "mongoose";
import cors from "cors";
import {connectToSocket} from "./controllers/socketManager.js";
import userRoutes from "./routes/user.routes.js"


const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port", (process.env.PORT || 8000));
app.use(cors({
  origin: "https://video-conferencing-app-frontend-28z6.onrender.com",
  credentials: true
}));

app.use(express.json({limit: "40kb"}));
app.use(express.urlencoded({limit: "40kb", extended: true}))

app.use("/api/v1/users", userRoutes);

const start = async () => {
  const connectionDb = await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: true, // Ensure SSL is on
    tlsAllowInvalidCertificates: false,
  });

  mongoose.set("debug", true);

  console.log(`Connected to mongodb: ${connectionDb}`);
  server.listen(app.get("port"), () => {
    console.log(`Server is running on port ${app.get("port")}`);
  });
};

start();