import Resp from '../../utils/response';
import OtpSystem from '../../features/otp_system/otp.system.util';
import client from 'airdady';
import CreateLog from '../../features/logs/logs.util';

const optMiddleware = {
	generateOtp: async (req, res) => {
		const { senderId, message, expiry, otplen } = req.profile;
		const reqData = { to: req.params.to, senderId, content: message, expiry, otplen };
		OtpSystem.generateOtp(reqData, async (error, genRes) => {
			if (error) return Resp(res, 400, error);
			return CreateLog('verify', req.user._id, req.params.to, senderId, genRes.data.msgId)
				.then(() => Resp(res, 200, genRes.message, genRes.data))
				.catch((err) => {
					console.log(err);
					return Resp(res, 400, err)
				});
		});
	},

	verifyOtp: async (req, res) => {
		const { to, code } = req.params;
		OtpSystem.verifyCode(to, code, (error, message) => {
			return error ? Resp(res, 400, error) : Resp(res, 200, message);
		});
	},

	resendOtp: async (req, res) => {
		const { to } = req.params;
		OtpSystem.resendOtp(req.profile, to, (error, message) => {
			return error ? Resp(res, 400, error) : Resp(res, 200, message);
		});
	},

	test: async (req, res) => {
		client.otp
			.keys('AC.a1dad8f6.09ff40edbf04.6d8c6d975722')
			.generate({ to: '256758307272' })
			.then((response) => res.send(response.data))
			.catch((error) => res.send(error.response));
	},
};

export default optMiddleware;
