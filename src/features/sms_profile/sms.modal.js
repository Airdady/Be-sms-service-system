import mongoose from 'mongoose';

const SmsSchema = new mongoose.Schema(
  {
    profileName: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    senderId: {
      type: String,
      required: true,
    },
    dlr: {
      type: String,
    },
    dlrUrl: {
      type: String,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Sms = mongoose.model('Sms', SmsSchema);

export default Sms;
