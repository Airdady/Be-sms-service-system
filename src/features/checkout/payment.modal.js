import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
  {
    amount: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    payerId: {
      type: String,
      required: true,
    },
    orderId: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", PaymentSchema);

export default Payment;
