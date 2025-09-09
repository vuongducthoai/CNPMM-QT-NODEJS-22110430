import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/node_tuan3", {

    })
    console.log("MongoDB connected sucessfully!");
  } catch(error){
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}

export default connectDB;
