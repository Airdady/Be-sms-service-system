import express from "express";
import Auth from '../../../features/auth/auth.middleware'
import SMSController from './sms.controller'

const router = express.Router();

router.post("/send", SMSController.send);
router.post("/send_batch", SMSController.batchSend);

export default router;