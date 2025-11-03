import Doctor from "../models/doctorModel.js";
import Appointment from "../models/appointmentModel.js";

// 🔹 Get doctor profile by user ID
export const getDoctorProfile = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ userId: req.user._id });
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    res.json(doctor);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to get doctor profile", error: error.message });
  }
};

// 🔹 Update doctor availability
export const updateAvailability = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ userId: req.user._id });
    doctor.availableSlots = req.body.availableSlots;
    await doctor.save();
    res.json({ message: "Availability updated", doctor });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update availability", error: error.message });
  }
};

// 🔹 Get appointments for a doctor
export const getDoctorAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      doctorId: req.user._id,
    }).populate("userId", "name email");
    res.json(appointments);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch appointments", error: error.message });
  }
};
