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
    msg: {
      type: String,
    },
    senderName: {
      type: String,
      required: true,
    },
    dlr: {
      type: Number,
      required: true,
    },
    serviceToken: {
      type: String,
      required: true,
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
