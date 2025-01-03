const mongoose = require("mongoose");

//schema design
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    contact : {
      type: Number,
      required: [true, "contact is required"],
    },
    email: {
      type: String,
      required: [true, "email is required and should be unique"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    location: {
      type: String,
      required: [true, "location is required"],
    },
    role: { type: String, 
      enum: ["volunteer", "victim"], 
      required: true }, // Enforce allowed roles
    profilePicture: { type: String, default: '/uploads/profile-pictures/default.png' },
  },
  { timestamps: true }
);

//export
const userModel = mongoose.model("users", userSchema);
module.exports = userModel;