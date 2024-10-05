import mongoose from "mongoose";

const Schema = mongoose.Schema;

const FrameBuilderSchema = new Schema({
  name: String,
  description: String
});

// Export function to create "SomeModel" model class
export default  mongoose.model("FrameBuilder", FrameBuilderSchema)