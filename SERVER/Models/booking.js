import mongoose from "mongoose";
import { show } from "../Services/showService";

const bookingSchema = new mongoose.Schema(
  {
    user: { type: String, required: true, ref: "User" },
    show: { type: String, required: true, ref: "Show" },
    ammount: { type: Number, required: true },
    seats: { type: Array, required: true },
    isPaid: { type: Boolean, required: true, default: false },
    paymentInfo: { type: String },
  },
  { timestamps: true },
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
