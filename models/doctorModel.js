import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // connect with User model (foreign key)
      required: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    experience: {
      type: Number, // years of experience
      required: true,
    },
    qualification: {
      type: String,
    },
    clinicAddress: {
      type: String,
    },
    phone: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending", // admin approval system
    },
    availableSlots: [
      {
        day: String, // e.g. "Monday"
        time: String, // e.g. "10:00 AM - 2:00 PM"
      },
    ],
  },
  { timestamps: true }
);

const Doctor = mongoose.model("Doctor", doctorSchema);
export default Doctor;
