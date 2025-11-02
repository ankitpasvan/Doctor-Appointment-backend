import mongoose from "mongoose";

// Step 1: Create schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // User ka naam dena mandatory hai
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ek hi email se ek hi account banega
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "doctor", "admin"], // user kis type ka hai
      default: "user",
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
  },
  { timestamps: true } // automatic createdAt, updatedAt fields
);

// Step 2: Create model
const User = mongoose.model("User", userSchema);

// Step 3: Export model
export default User;
