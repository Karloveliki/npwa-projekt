import express from "express";
import cors from "cors";

import FrameBuilder from "./models/frameBuilder.js";
import dotenvx from '@dotenvx/dotenvx';

const mongoConnectString = dotenvx.config()

console.log("mogodb connect string",process.env["MONGODB"])

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {

    console.log("mogodb connect string",process.env["MONGODB"])
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