import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
        console.log("Mongoose connected to DB");
    });

    await mongoose.connect(`${process.env.MONGO_URI}/quickshow`);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
