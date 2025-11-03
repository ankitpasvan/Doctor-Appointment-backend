import Appointment from "../models/appointmentModel.js";
import Doctor from "../models/doctorModel.js";

// 🔹 Book Appointment
export const bookAppointment = async (req, res) => {
  try {
    const { doctorId, appointmentDate, reason } = req.body;

    const doctor = await Doctor.findById(doctorId);
    if (!doctor || doctor.status !== "approved") {
      return res.status(400).json({ message: "Doctor not available" });
    }

    const appointment = await Appointment.create({
      userId: req.user._id,
      doctorId,
      appointmentDate,
      reason,
    });

    res
      .status(201)
      .json({ message: "Appointment booked successfully", appointment });
  } catch (error) {
    res.status(500).json({ message: "Booking failed", error: error.message });
  }
};

// 🔹 Get User Appointments
export const getUserAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      userId: req.user._id,
    }).populate("doctorId", "specialization clinicAddress");
    res.json(appointments);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch appointments", error: error.message });
  }
};

// 🔹 Update Appointment Status (for doctor)
export const updateAppointmentStatus = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment)
      return res.status(404).json({ message: "Appointment not found" });

    appointment.status = req.body.status;
    await appointment.save();
    res.json({ message: "Status updated successfully", appointment });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update status", error: error.message });
  }
};
