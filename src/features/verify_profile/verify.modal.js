import mongoose from 'mongoose';

const OtpSchema = new mongoose.Schema(
	{
		profileName: {
			type: String,
			required: true,
		},
		userId: {
			type: String,
			required: true,
		},
		message: {
			type: String,
			required: true,
		},
		expiry: {
			type: Number,
			required: true,
		},
		senderId: {
			type: String,
			required: true,
		},
		otplen: {
			type: Number,
			required: true,
		},
		active: {
			type: Boolean,
			default: true,
		},
	},
	{ timestamps: true },
);

const Otp = mongoose.model('Otp', OtpSchema);

export default Otp;
