import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
async function connectDatabase() {
  await mongoose.connect(
    process.env.DB_MONGO_URL
  );
}

export default connectDatabase;
