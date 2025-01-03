// models/shelterModel.js
const mongoose = require("mongoose");

const shelterSchema = new mongoose.Schema({
  zilla: {
    type: String,
    required: [true, "Zilla name is required"],
  },
  upazilas: [{
    name: {
      type: String,
      required: [true, "Upazila name is required"],
    },
    shelters: [{
      lat: {
        type: Number,
        required: [true, "Latitude is required"],
      },
      lng: {
        type: Number,
        required: [true, "Longitude is required"],
      },
      color: {
        type: String,
        default: "blue",
      },
      name: {
        type: String,
        required: [true, "Shelter name is required"],
      }
    }]
  }]
}, { timestamps: true });

// Export the model
const shelterModel = mongoose.model("shelters", shelterSchema);
module.exports = shelterModel;