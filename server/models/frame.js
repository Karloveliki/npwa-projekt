import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const FrameSchema = new Schema({
  name: {
    type: String,
    required: true, // Optional, but recommended
    unique: true, // This enforces uniqueness
    minlength: 3, // Minimum length of 3 characters
    maxlength: 50,
  },
  description: String,
  bikeType: {
    type: String,
    required: true,
    enum: ["road","mtb","trekking","gravel","city","cargo","bmx"]
  },
  geometry_type: {
    type: String,
    required: true,
    enum: ["man","women","universal"]
  },
  wheelSize: {
    type: String,
    required: true,
    enum: ['20"', '24"','26"', '27.5"', '28"' ,'29"','12"','16"']
  },
  suspension: {
    type: String,
    required: true,
    enum: ["no", "front", "back", "full"]
  },
  material: {
    type: String,
    required: true,
    enum: ["steel", "aluminium", "titan", "carbon"]
  },
  availableSizes: {
    type: [String],
    required: true,
    enum: ["47","50","52","54","56","58","60","62","XS","S","M","M/L","L","XL","XXL"]
  },
  images: {
    type: [String],
    required: true,
  },
  frameBuilder: {
    type: ObjectId,
    ref: 'FrameBuilder',
    required: true
  },
  basePrice: {
    type: Number,
    required: true,

  },
  downPayment:{
    type: Number,
    required: true
  },
  forkIncluded: {
    type: Boolean,
    required: true
  }

});

//ime,
//description
//vrsta: "road" "mtb" "trekking" "gravel" "city" "cargo" "bmx"
// vrsta geometrije "man", "women" "universal"
 //velicinaKotaca: "20" "24" "26" "27.5" "28" "29"
//suspension: "no" "front" "back" "full"
//material: "steel" "aluminium" "titan" "carbon"
//dostupneVelicine: []
//slike: [] urlova
//frameBUilder: "frameBuilder"
//basePrice: xxx
// predujam : xxx
// da li je vilica uključena

// Export function to create "SomeModel" model class
export default  mongoose.model("Frame", FrameSchema)