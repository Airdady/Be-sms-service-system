import User from './user.modal';
import AuthUtil from './auth.util';
import Resp from '../../utils/response';
import bcrypt from 'bcrypt';
import Wallet from '../wallet/wallet.model';
import Mailer from '../../utils/mailer';

const userController = {
	login: (req, res) => {
		const { email, password } = req.body;
		User.findOne({ email }, (err, user) => {
			if (!user) return Resp(res, 401, 'user does not exist');
			if (AuthUtil.comparePassword(password, user.password)) {
				user.password = undefined;
				const token = AuthUtil.createToken({
					_id: user._id,
					email: user.email,
				});
				return Resp(res, 200, 'login successful', { user, token });
			}
			return Resp(res, 401, 'Invalid login details');
		});
	},
	register: (req, res) => {
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(req.body.password, salt, (err, password) => {
				User.create({ ...req.body, password }, (err, user) => {
					if (err) {
						return res.status(400).send({ message: 'Create user failed', err });
					}
					Wallet.create({ userId: user._id }, (error, wallet) => {
						if (wallet) {
							Mailer.accountActivation(user, req);
							return res.status(200).send({
								status: 200,
								message: 'registration successful',
								data: user,
							});
						} else {
							return Resp(res, 422, 'error occurred while creating the account');
						}
					});
				});
			});
		});
	},
	confirmUser: async (req, res, next) => {
		User.updateOne({ email: req.user.email }, { verified: true }, (err, user) => {
			if (err) return Resp(res, 422, 'account confirmation failed');
			return Resp(res, 200, 'account confirmation successful');
		});
	},
	resetPassword: async (req, res) => {
		User.findOne({ email: req.body.email }, (err, user) => {
			if (err) return Resp(res, 422, 'account confirmation failed');
			if (!user) return Resp(res, 400, 'no user associated with email found');
			Mailer.passwordReset(user, req);
			return Resp(res, 200, `confirmation instructions have been sent to ${user.email}`);
		});
	},
	setNewPassword: async (req, res) => {
		User.updateOne({ email: req.user.email }, { password: AuthUtil.hashPassword(req.body.password) }, (err, user) => {
			if (err) return Resp(res, 422, 'password reset failed');
			// if (!user) return Resp(res, 400, 'no user associated with email found');
			return Resp(res, 200, 'new password set successfully');
		});
	},
};

export default userController;
