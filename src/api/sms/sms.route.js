import express from "express";
import SMSController from './sms.controller'
import Validate from '../utils/validations'

const router = express.Router();

router.post("/send", Validate.sms, SMSController.send);
router.post("/send_batch", Validate.batch, SMSController.batchSend);

export default router;