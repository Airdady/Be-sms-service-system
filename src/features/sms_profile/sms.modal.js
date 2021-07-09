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
      enum: ['yes', 'no']
    },
    dlrUrl: {
      type: String,
    },
    dlrLevel: {
      type: Number,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Sms = mongoose.model('Sms', SmsSchema);

export default Sms;
