import Doctor from "../models/doctorModel.js";
import User from "../models/userModel.js";

// 🔹 Get all doctors
export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().populate("userId", "name email");
    res.json(doctors);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch doctors", error: error.message });
  }
};

// 🔹 Approve Doctor
export const approveDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    doctor.status = "approved";
    await doctor.save();

    res.json({ message: "Doctor approved successfully", doctor });
  } catch (error) {
    res.status(500).json({ message: "Approval failed", error: error.message });
  }
};

// 🔹 Reject Doctor
export const rejectDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    doctor.status = "rejected";
    await doctor.save();

    res.json({ message: "Doctor rejected successfully", doctor });
  } catch (error) {
    res.status(500).json({ message: "Rejection failed", error: error.message });
  }
};

// 🔹 Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch users", error: error.message });
  }
};
