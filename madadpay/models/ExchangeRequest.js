import mongoose from "mongoose";

const exchangeRequestSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: { type: Number, required: true },
  mode: { type: String, enum: ["cash", "upi"], required: true },
  message: { type: String },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected", "completed"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
});

const ExchangeRequest =
  mongoose.models.ExchangeRequest ||
  mongoose.model("ExchangeRequest", exchangeRequestSchema);

export default ExchangeRequest;
