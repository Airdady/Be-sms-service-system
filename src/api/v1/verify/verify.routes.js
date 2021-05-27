import express from "express";
import Auth from '../../../features/auth/auth.middleware'
import OtpController from './verify.controller'

const router = express.Router();

router.post("/generate/:msisdn", Auth.getServiceTokenDetails, OtpController.generateOtp );
router.post("/verify/:otp_id/:otp_code", OtpController.verifyOtp );
router.post("/resend/:otp_id", OtpController.resendOtp);
router.post("/test", OtpController.test);

export default router;