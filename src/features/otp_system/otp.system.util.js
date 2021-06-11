import OtpSystem from './otp.system.model';
import { SmsRouter } from '../../api/config';
import moment from 'moment';

const generateOTP = (length) => {
	let digits = '0123456789';
	const otpLength = length;
	let otp = '';
	for (let i = 1; i <= otpLength; i++) {
		const index = Math.floor(Math.random() * digits.length);
		otp = otp + digits[index];
	}
	return otp;
};

const OtpSystemUtil = {
	generateOtp: (data, cb) => {
		const code = generateOTP(data.otplen);
		return OtpSystem.updateOne(
			{ to: data.to },
			{
				code,
				expiry: moment().add(data.expiry, 'minutes').toISOString(),
				to: data.to,
			},
			{ upsert: true },
			() =>
				SmsRouter.post(`/send`, {
					from: data.senderId,
					to: data.to,
					content: data.content.replace('{code}', code),
				})
					.then(() => cb('', 'verification code send successfully'))
					.catch(() => cb('verification resend failed')),
		);
	},
	resendOtp: (data, to, cb) => {
		return OtpSystem.findOne({ to }).then((res) => {
			if (!res) return cb('Invalid verification details');
			OtpSystem.updateOne({ to: res.to }, { expiry: moment().add(data.expiry, 'minutes').toISOString() }).then(() => {
				SmsRouter.post(`/send`, {
					from: data.senderId,
					to,
					content: data.message.replace('{code}', res.code),
				})
					.then(() => cb('', 'verification resent successfully'))
					.catch(() => cb('verification resend failed'));
			});
		});
	},
	verifyCode: (to, code, cb) => {
        return OtpSystem.findOne({ to }, (error, data) => {
            if (!data) return cb(`verification not initialized for +${to}`);
            return OtpSystem.findOne({ to, code }, (error, data) => {
                if (error) return cb('code verification failed');
                if (!data) return cb('Invalid verification code');
                if (data && moment(data.expiry).isBefore(moment())) {
                    return OtpSystem.remove({ to })
                        .then(() => cb('verification code expired'))
                        .catch(() => cb('code verification failed'));
                } else {
                    return OtpSystem.remove({ to })
                        .then(() => cb('', 'verification success'))
                        .catch(() => cb('code verification failed'));
                }
            });
        })
	},
};

export default OtpSystemUtil;
