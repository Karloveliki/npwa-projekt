import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const FrameBuilderSchema = new Schema({
  name: {
    type: String,
    required: true, // Optional, but recommended
    unique: true // This enforces uniqueness
  },
  description: String,
  contact: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  bikeFrames: {
    type: [ObjectId],
    ref: "Frame"
  }
});

// Export function to create "SomeModel" model class
export default  mongoose.model("FrameBuilder", FrameBuilderSchema)