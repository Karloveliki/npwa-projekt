import express from "express";
import cors from "cors";

import FrameBuilder from "./models/frameBuilder.js";
import Frame from "./models/frame.js";
import dotenvx from '@dotenvx/dotenvx';
import mongoose from "mongoose";
import User from "./models/user.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import authenticateToken from "./auth.js";
import checkAdmin from "./checkIfAdmin.js";

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

app.get("/frameBuilders",
   authenticateToken,
  async (req, res) => {
  try{
    const filter=makeFilter(req,["name"])
    //const frameBuilders = await FrameBuilder.find(filter).exec();
    const aggregationPipeline = [
      {
          $match: filter, // Use your filtering function to create the proper filter
      },
      {
        $lookup: {
          from: 'frames',  // Name of the frames collection
          localField: '_id', // Field in the FrameBuilder collection
          foreignField: 'frameBuilder', // Field in the Frame collection
          as: 'frames' // Result will be placed here
        }
      },
  ];

    const frameBuilders = await FrameBuilder.aggregate(aggregationPipeline).exec();
    console.log("fetched data from mongo", )
    res.status(200).json(frameBuilders);
  }
  catch(error){
    console.error("get frameBuilders",error)
    res.status(500).json({"error": error})
  }
});

app.post("/frameBuilders",
  authenticateToken,
  checkAdmin,
  async (req, res) =>{
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

app.put('/frameBuilders/:id', authenticateToken,
  checkAdmin,
  async (req, res) => {
  try {
    const frameBuilderId= req.params.id
    const result = await FrameBuilder.findByIdAndUpdate(frameBuilderId, req.body, { new: true })
    if(!result){
      return res.status(404).json("not found")
    }
    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ message: 'Error updating frameBuilder', error: err.message });
  }
});

app.get("/frameBuilders/:id",
  authenticateToken
  , async (req, res) => {
  try {
    const frameBuilderId= req.params.id
    const result= await FrameBuilder.findById(frameBuilderId)
    if(!result){
      return res.status(404).json("not found")
    }
    res.status(200).json(result)
  }
  catch (err) {
    res.status(500).json({ message: 'Error', error: err.message });
  }
})

app.delete("/frameBuilders/:id",
  authenticateToken,
  checkAdmin,
  async (req, res) => {
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

function makeFilter(req, filterNames) {
  const obj={}
  filterNames.forEach(element => {
    if(req.query[element]){
      obj[element]=req.query[element]
    }
  });
  return obj
}

function makeSort(req,arrayPossibilites,defaultSort){
  const sort=req.query.sort || defaultSort
  console.log("sort je: ",sort)
  const baseSort=sort.replace("-","")
  console.log("baseSort je: ",baseSort)
  if(!arrayPossibilites.includes(baseSort)){
    console.log("usao u if")
    return false
  }
  return sort
}

app.get("/frames",
  authenticateToken
  ,async(req,res)=>{
  try{
    const sort=makeSort(req,["basePrice","name"],"basePrice")
    if(!sort){
      return res.status(400).json({"err": "invalid sort"})
    }
    const filter = makeFilter(req, ["name", "material","wheelSize","frameBuilder"])
    const frames=await Frame.find(filter).populate("frameBuilder").sort(sort)
    res.status(200).json(frames)
  }
  catch(error){
    console.log("get frames err",error)
    res.status(500).json({"error": error})
  }
})

app.post("/frames",
  authenticateToken,
  checkAdmin,
  async(req,res)=>{
  try{
  const newDocument = new Frame(req.body);
    const result = await newDocument.save()
    res.status(200).json(result)
  }
  catch(error){
    console.error("post frame",error)
    res.status(500).json({"error": error})
  }
})

app.put('/frames/:id',
  authenticateToken,
  checkAdmin,
  async (req, res) => {
  console.log("u put frme ruti")
  try {
    const frameId= req.params.id
    console.log("frameid: ",frameId)
    const result = await Frame.findByIdAndUpdate(frameId, req.body, { new: true })
    if(!result){
      return res.status(404).json("not found")
    }
    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ message: 'Error updating frame', error: err.message });
  }
});

app.get("/frames/:id", 
  authenticateToken,
  async (req, res) => {
  try {
    const frameId= req.params.id
    const result= await Frame.findById(frameId).populate("frameBuilder")
    if(!result){
      return res.status(404).json("not found")
    }
    res.status(200).json(result)
  }
  catch (err) {
    res.status(500).json({ message: 'Error', error: err.message });
  }
})

app.delete("/frames/:id",
  authenticateToken,
  checkAdmin,async (req, res) => {
  try{
    const frameId= req.params.id
    const result=await Frame.findByIdAndDelete(frameId)
    if(!result){
      return res.status(404).json("not found")
    }
    res.status(200).json(result)
  }
  catch(err){
    res.status(500).json({ message: 'Error', error: err.message });
  }
})

app.get("/users",
  authenticateToken,
  async(req,res)=>{
  try{
    const filter=makeFilter(req,["userName","mail","phoneNumber","firstName","lastName"])
    const sort=makeSort(req,["phoneNumber","userName","firstName","lastName","mail"],"firstName")
    if(!sort){
      return res.status(400).json({"err": "invalid sort"})
    }

    const users= await User.find(filter).sort(sort)
    res.status(200).json(users)
  }
  catch(eror){
    console.log("err",eror)
    res.status(500).json({"err": eror})
  }
})

app.post("/users",async(req,res)=>{
  try{
    const { password } = req.body;
    //const [x,y] = [1,2]
    //const {xx, yy} = {xx:77, yy:88, yyy:999}
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newDocument=new User({
      ...req.body,
      "basket": [],
      "userType": "normalUser",
      "password": hashedPassword,
      "active": true
    })
    const result=await newDocument.save()
    res.status(200).json(result["_id"])
  }
  catch(err){
    console.log("err",err)
    res.status(500).json(err)
  }
})

app.put("/users/:id",authenticateToken,
  // todo user moze samo svoje mjenjati osim admina koji moze sve
  async(req,res)=>{
  try{
    const userId=req.params.id
    const result=await User.findByIdAndUpdate(userId,req.body,{new: true})
    if(!result){
      return res.status(404).json("not found")
    }
    res.status(200).json(result)
  }
  catch(err){
    console.log("err",err)
    res.status(500).json(err)
  }
})

app.get("/users/:id",
  authenticateToken,
  //todo razmislit kako da user dohvaća samo svoj a admin svih
  async(req,res)=>{
  try {
    const userId= req.params.id
    const result= await User.findById(userId)
    if(!result){
      return res.status(404).json("not found")
    }
    res.status(200).json(result)
  }
  catch (err) {
    res.status(500).json({ message: 'Error', error: err.message });
  }
})

app.delete("/users/:id",
  authenticateToken,
  checkAdmin,
  async(req,res)=>{
  try{
    const userId= req.params.id
    const result=await  User.findByIdAndDelete(userId)
    if(!result){
      return res.status(404).json("not found")
    }
    res.status(200).json(result)
  }
  catch(err){
    res.status(500).json({ message: 'Error', error: err.message });
  }
})

app.post("/users/login",async(req,res)=>{
  try{

    
    const userName=req.body.userName
    const userPassword=req.body.password
    const rez=await User.findOne({userName})
    if(!rez){
      return res.status(401).json({"message":"not Authorized"})
    }
    const userId=rez["_id"]
    const userType=rez["userType"]
    if (!rez) {
      return res.status(401).json({"notAuthorized": "not Authorized"})
    }
    const isValid = await bcrypt.compare(userPassword, rez["password"]);
    if (isValid) {
      const payload={
        userId,
        userName,
        userType
      }
      const privateKey=process.env["JWT_PRIVATE_KEY"]
      const token= jwt.sign(payload,privateKey)
      return res.status(200).json({userId,userName,userType,token})
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
  }
  catch(err){
    console.log("err",err)
    res.status(500).json({err})
  }
})



// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
