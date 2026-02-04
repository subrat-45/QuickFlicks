import mongoose from "mongoose";

const screenSchema = new mongoose.Schema(
  {
    screenId: { type: String, required: true },
    screenName: { type: String, required: true },
    totalRow: { type: Number, required: true },
    seatsPerRow: { type: Object, required: true },
  },
  { minimize: false },
);

const Screen = mongoose.model("Screen", screenSchema);

export default Screen;
