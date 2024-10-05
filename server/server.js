import express from "express";
import cors from "cors";

import FrameBuilder from "./models/frameBuilder.js";
import dotenvx from '@dotenvx/dotenvx';
import mongoose from "mongoose";

dotenvx.config()

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());


try {
  console.log("Connecting to the MongoDB...")
  await mongoose.connect(process.env["MONGODB"]);
  console.log("Connected to the MongoDB!")
} catch (error) {
  console.error("Connect to the MongoDB failed:", error)
  process.exit(-1)
}

app.get("/", async (req, res) => {
    const hello = {hello: "world"}
    res.send(hello).status(200);
  });

app.get("/frameBuilders", async (req, res) => {
    const frameBuilders = await FrameBuilder.find().exec();
    console.log("fetched data from mongo", )
    res.send(frameBuilders).status(200);
});


// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});