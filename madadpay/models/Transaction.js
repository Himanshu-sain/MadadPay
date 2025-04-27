import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: [100, "Minimum transaction amount is ₹100"],
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected", "completed", "cancelled"],
      default: "pending",
    },
    otp: {
      code: String,
      expiresAt: Date,
    },
    meetingLocation: {
      type: {
        type: String,
        default: "Point",
      },
      coordinates: [Number],
      address: String,
    },
    rating: {
      bySender: Number,
      byReceiver: Number,
      feedback: String,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
transactionSchema.index({ sender: 1 });
transactionSchema.index({ receiver: 1 });
transactionSchema.index({ status: 1 });
transactionSchema.index({ meetingLocation: "2dsphere" });

const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;
