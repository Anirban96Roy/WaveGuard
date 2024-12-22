const mongoose = require("mongoose");

// Union schema for individual union strings
const UnionSchema = new mongoose.Schema({
  type: {
    type: String, // Specify the type of each union
    required: true, // Mark it as required
  },
});

// Upazila schema for upazilas containing unions
const UpazilaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  unions: [
    {
      type: String, // Each union is a string
      required: true, // Mark it as required
    },
  ],
});

// Location schema for main document
const LocationSchema = new mongoose.Schema({
  zilla: {
    type: String,
    required: true,
  },
  upazilas: [UpazilaSchema], // Array of embedded UpazilaSchema
});

// Create the model from the schema
const locationModel = mongoose.model("Location", LocationSchema);

module.exports = locationModel;
