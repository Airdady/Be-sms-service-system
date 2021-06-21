import express, { response } from 'express';
import UserRoute from './features/auth/user.route';
import VerifyRoute from './features/verify_profile/verify.route';
import SmsProfile from './features/sms_profile/sms.route';
import checkout from './features/checkout/checkout.route';
import Auth from './features/auth/auth.middleware';
import VerifyApi from './api/verify/verify.routes';
import SMSApi from './api/sms/sms.route';
import Wallet from './features/wallet/wallet.route';
import Stats from './features/stats/stats.router';
import Logs from './features/logs/logs.router';
import Address from './features/address/address.route';
const stripe = require('stripe')('YOUR_SECRET_KEY_HERE')

const router = express.Router();

router.use('/auth', UserRoute);
router.use('/verify_profile', Auth.verifyToken, VerifyRoute);
router.use('/sms_profile', Auth.verifyToken, SmsProfile);
router.use('/payments', checkout);
router.use('/wallet',Auth.verifyToken, Wallet);
router.use('/stats',Auth.verifyToken, Stats);
router.use('/api_logs',Auth.verifyToken, Logs);
router.use('/otp',Auth.findUserByVerifyToken, Auth.checkServiceCredit, VerifyApi);
router.use('/sms', Auth.findUserByToken, Auth.checkServiceCredit, SMSApi);
router.use('/address', Auth.verifyToken, Address);

export default router;
