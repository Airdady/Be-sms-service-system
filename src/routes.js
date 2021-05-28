import express, { response } from 'express';
import UserRoute from './features/auth/user.route';
import VerifyRoute from './features/verify/verify.route';
import Sms from './features/sms/sms.route';
import checkout from './features/checkout/checkout.route';
import Auth from './features/auth/auth.middleware';
import Verify from './api/v1/verify/verify.routes';
import Wallet from './features/wallet/wallet.route';

const router = express.Router();
router.use('/auth', UserRoute);
router.use('/verify', Auth.verifyToken, VerifyRoute);
router.use('/sms', Auth.verifyToken, Sms);
router.use('/payments', checkout);
router.use('/payments', checkout);
router.use('/api/v1/otp', Verify);
router.use('/api/v1/sms', Verify);
router.use('/api/v1/wallet', Wallet);

export default router;
