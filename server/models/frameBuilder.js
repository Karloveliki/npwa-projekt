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
});
                  

FrameBuilderSchema.pre('findOneAndDelete', { document: true, query: true },async function(next){
  const docToUpdate = await this.model.findOne(this.getQuery());
  const frameBuilderId = docToUpdate._id;
  const Frame = mongoose.model("Frame");
    try{
      const framesWithThisBuilder = await Frame.countDocuments({frameBuilder: frameBuilderId});
        if(framesWithThisBuilder>0){
          console.log("ne smijem ga brisati")
          next(new Error(`Cannot delete FrameBuilder with ID ${frameBuilderId} as 
            it is referenced by ${framesWithThisBuilder} frames.`));
      }
        next();
    }
    catch(e){
      console.log("neka greska", e)
      next(e);
    }
});
// Export function to create "SomeModel" model class
export default  mongoose.model("FrameBuilder", FrameBuilderSchema)