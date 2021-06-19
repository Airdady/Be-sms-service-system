import mongoose from 'mongoose';

const OtpSchema = new mongoose.Schema(
	{
        userId: {
			type: String,
			required: true,
		},
		country: {
			type: String,
			required: true,
		},
		state: {
			type: String,
			required: true,
		},
		address: {
			type: String,
			required: true,
		},
		city: {
			type: String,
			required: true,
		},
        postal_code: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true },
);

const Address = mongoose.model('Address', OtpSchema);

export default Address;
