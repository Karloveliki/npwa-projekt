import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userName: {
    type: String,
    required: true, // Optional, but recommended
    unique: true // This enforces uniqueness
  },
  mail: {
    type: String,
    required: true,
    unique: true
  },
  password:{
    type: String,
    required: true,
  },
  basket: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Frame' }],
  phoneNumber:{
    type: String
  },
  firstName:{
    type: String
  },
  lastName:{
    type: String
  },
  userType: {
    type: String,
    enum: ["normalUser","admin"],
    required: true
  },
  active: {
    type: Boolean,
    required: true
  }


});

//
//košarica
//mail
//prezime
//userName
//broj mobitela
//passord

// Export function to create "SomeModel" model class
export default  mongoose.model("User", UserSchema)