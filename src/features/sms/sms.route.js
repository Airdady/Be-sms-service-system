import express from 'express';
import smsController from './sms.controller';

const router = express.Router();

router
  .route('/')
  .get(smsController.getSms)
  .post(smsController.createProfile);

router
  .route('/:id')
  .delete(smsController.deleteSms)
  .patch(smsController.updateSms);

router.route('/user/:id').get(smsController.getSmsById);

export default router;
