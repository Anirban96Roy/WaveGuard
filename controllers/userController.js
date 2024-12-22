const userModel = require("../models/userModel");
const locationModel = require("../models/locationModel");
const jwt = require("jsonwebtoken");

// Login Callback
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email, password });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d", // Token expires in 1 day
    });

    res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        contact: user.contact,
        email: user.email,
        location: user.location,
        role: user.role,  // Include role
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Register Callback
const registerController = async (req, res) => {
  try {
    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(201).json({
      success: true,
      newUser,
    });
  } catch (error) {
    console.error(error);  // Log error for debugging
    res.status(400).json({
      success: false,
      message: error.message || "Registration failed",
      error,
    });
  }
};

// Get User Profile
// Backend route to get user profile
const getUserProfile = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id).select('-password'); // Find user by ID
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getLocations = async (req, res) => {
  try {
    const locations = await locationModel.find();
    res.status(200).json(locations);
  } catch (error) {
    console.error("Error fetching locations:", error.message);
    res.status(500).json({ message: "Failed to fetch locations" });
  }
};




const updateUserProfile = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    console.log("Authenticated User ID:", req.user._id);
    console.log("Requested User ID:", req.params.id);

    const userId = req.params.id;
    const updates = req.body; // Contains the field(s) to update

    // Find the user and update only the fields provided
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "User profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error.message);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
}


module.exports = { loginController, registerController, getUserProfile, updateUserProfile, getLocations };
