import mongoose from 'mongoose';

const WalletSchema = new mongoose.Schema(
  {
    balance: {
      type: Number,
      default: 0,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Wallet = mongoose.model('Wallet', WalletSchema);

export default Wallet;
