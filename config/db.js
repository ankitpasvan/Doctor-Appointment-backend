import mongoose from "mongoose";
import dotenv from "dotenv";
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      UseUnifiedTopology: true,
    });
    console.log("mongoDB connected ");
  } catch (error) {
    console.log(" mongoDB not connected");
    console.log(error);
    console.log(error.messege);
  }
};

export default connectDB;
