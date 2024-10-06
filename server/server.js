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
    res.status(200).json(frameBuilders);
});

app.post("/frameBuilders",async (req, res) =>{
  console.log("post data to mongo",req.body)
  try{
    const newDocument = new FrameBuilder(req.body);
    const result = await newDocument.save()
    res.status(200).json(result)
  }
  catch(error){
    console.error("post frameBuilder",error)
    res.status(500).json({"error": error})
  }
})

app.put('/frameBuilders/:id', async (req, res) => {
  try {
    const frameBuilderId= req.params.id
    const result = await FrameBuilder.findByIdAndUpdate(frameBuilderId, req.body, { new: true })
    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ message: 'Error updating frameBuilder', error: err.message });
  }
});

app.get("/frameBuilders/:id", async (req, res) => {
  try {
    const frameBuilderId= req.params.id
    const result= await FrameBuilder.findById(frameBuilderId)
    res.status(200).json(result)
  }
  catch (err) {
    res.status(500).json({ message: 'Error', error: err.message });
  }
})

app.delete("/frameBuilders/:id",async (req, res) => {
  try{
    const frameBuilderId= req.params.id
    const result=await FrameBuilder.findByIdAndDelete(frameBuilderId)
    if(!result){
      return res.status(404).json("not found")
    }
    res.status(200).json(result)
  }
  catch(err){
    res.status(500).json({ message: 'Error', error: err.message });
  }
})

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});