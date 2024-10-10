import mongoose from "mongoose";

async function connectDatabase() {
  await mongoose.connect(
    "mongodb+srv://aldojunior:r6oQLVLybkh5MpSo@cluster0.jwbhv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );
}

export default connectDatabase;
