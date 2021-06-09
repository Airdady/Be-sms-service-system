import express from "express";
import Auth from '../auth/auth.middleware'
import PaymentController from './payment.controller'

const router = express.Router();

router.post("/capture", Auth.verifyToken, Auth.findUser, PaymentController.capturePayment );
router.get("/", Auth.verifyToken, Auth.findUser, PaymentController.getAllPayment );

export default router;
