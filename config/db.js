import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();


const connectToMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to Mongo");
  } catch (error) {
    console.log("Failed to connect");
  }
};

connectToMongo();
export default connectToMongo;