import mongoose from 'mongoose';

const OtpSchema = new mongoose.Schema(
  {
    serviceType: {
      type: String,
    //   we should handle bulk sms count
      enum:['sms','verify']
    },
    to: {
      type: String,
      required: true,
    },
    from: {
      type: Number,
      required: true,
    },
    msgId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Logs = mongoose.model('Logs', OtpSchema);

export default Logs;
