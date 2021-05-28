import express from "express";
import Auth from '../../../features/auth/auth.middleware'
import OtpController from './verify.controller'

const router = express.Router();
router.post("/send", OtpController.resendOtp);
router.post("/send_batch", OtpController.test);

export default router;