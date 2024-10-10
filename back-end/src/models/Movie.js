import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  genre: {
    type: String,
    required: false,
  },
  registerDate: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("Movie", movieSchema);
