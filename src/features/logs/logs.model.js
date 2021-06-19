import mongoose from 'mongoose';

const OtpSchema = new mongoose.Schema(
	{
		serviceType: {
			type: String,
			//   we should handle bulk sms count
			enum: ['sms', 'verify'],
		},
		userId: {
			type: String,
		},
		to: {
			type: String,
			required: true,
		},
		from: {
			type: String,
			required: true,
		},
		msgId: {
			type: String,
		},
	},
	{ timestamps: true },
);

const Logs = mongoose.model('Logs', OtpSchema);

export default Logs;
