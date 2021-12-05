import AuthUtil from './auth.util';
import User from './user.modal';
import Response from '../../utils/response';
import Verify from '../verify_profile/verify.modal';
import Wallet from '../wallet/wallet.model';
import Token from '../../utils/generateToken';
import Sms from '../sms_profile/sms.modal';
import companyEmailValidator from './update.blacklist.mails';

const authMiddleware = {
	verifyToken: (req, res, next) => {
		const token = AuthUtil.getToken(req);
		const { error, user } = AuthUtil.verifyToken(token);
		error && Response(res, 401, error.message.replace('session', 'token'));
		req.user = user;
		return next();
	},

	findUser: async (req, res, next) => {
		User.findOne({ email: req.user.email }, (err, user) => {
			if (err) return Response({ message: 'user does not exist', err });
			return next();
		});
	},

	findUserByToken: (req, res, next) => {
		Sms.findById(req.query.keys, (error, data) => {
			if (!data || error) {
				return Response(res, 401, 'Authentication failed');
			}
			User.findById(data.userId, (err, user) => {
				if (!user || err) {
					return Response(res, 401, 'Authentication failed');
				}
				req.user = user;
				req.profile = data;
				return next();
			});
		});
	},

	findUserByVerifyToken: (req, res, next) => {
		Verify.findById(req.query.keys, (error, data) => {
			if (!data || error) {
				return Response(res, 401, 'Authentication failed');
			}
			
			User.findById(data.userId, (err, user) => {
				if (!user || err) {
					return Response(res, 401, 'Authentication failed');
				}
				console.log(err, user);
				req.user = user;
				req.profile = data;
				return next();
			});
		});
	},

	verifyUser: async (req, res, next) => {
		const { email, password } = Token.decode(req.query.keys);
		User.findOne({ email }, (err, user) => {
			if (!user || err) return Response(res, 401, 'authentication failed');
			if (AuthUtil.comparePassword(password, user.password)) {
				req.user = user;
				return next();
			}
			return Response(res, 401, 'authentication failed');
		});
	},

	getServiceTokenDetails: async (req, res, next) => {
		Verify.findOne({ serviceToken: req.query.keys }, (err, service) => {
			if (err) return Response(res, 422, 'something went wrong');
			if (!service) return Response(res, 404, 'Invalid service keys');
			req.service = service;
			return next();
		});
	},

	checkServiceCredit: async (req, res, next) => {
		Wallet.findOne({ userId: req.user._id }, (err, wallet) => {
			if (!wallet || err) return Response(res, 422, 'error occurred while getting wallet balance info');
			// if (wallet.balance < 0.005) return Response(res, 401, 'Low credit to complete the operation');
			return next();
		});
	},
	validateEmail: (req, res, next) => {
		const { email } = req.body;
		if (companyEmailValidator.match(email.split('@')[1])) {
			return Response(res, 400, 'we only accept company emails');
		}
		return next();
	},
};

export default authMiddleware;
