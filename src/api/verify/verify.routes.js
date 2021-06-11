import express from 'express';
import Auth from '../../features/auth/auth.middleware';
import OtpController from './verify.controller';

const router = express.Router();

router.use(Auth.checkServiceCredit);

router.post('/generate/:to', OtpController.generateOtp);
router.post('/verify/:to/:code', OtpController.verifyOtp);
router.post('/resend/:to', OtpController.resendOtp);
router.post('/test', OtpController.test);

export default router;
