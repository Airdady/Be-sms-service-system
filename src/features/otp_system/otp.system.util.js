import OtpSystem from './otp.system.model';
import { SmsRouter } from '../../api/config';
import moment from 'moment';

const OtpSystemUtil = {
	generateOtp: (data, cb) => {
		const code = Math.random()
			.toString()
			.slice(2, data.otplen + 2);
		const expiry = data.expiry;
		return OtpSystem.updateOne(
			{ to: data.to },
			{
				code,
				expiry: moment().add(expiry, 'minutes').toISOString(),
				to: data.to,
			},
			{ upsert: true },
			() =>
				SmsRouter.post(`/send`, {
					from: data.senderId,
					to: data.to,
					content: data.content.replace('{code}', code),
				})
					.then((data) => {
						const resData = data.config && JSON.parse(data.config.data);
						return cb('', {
							message: 'verification code send successfully',
							data: {
								senderId: resData.from,
								to: resData.to,
								expiry: parseInt(moment().add(expiry, 'minutes').format('X')),
								msgId: data.data.data.split(' ')[1].replace('"', ''),
							},
						});
					})
					.catch((error) => {
						console.log(error);
						return cb('verification code send failed');
					}),
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
			if (!data) return cb(`Invalid verification code`);
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
		});
	},
};

export default OtpSystemUtil;
