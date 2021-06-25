import express from 'express';
import SMS from './sms.controller';

const router = express.Router();

router.route('/').get(SMS.getAll).post(SMS.create);

router.route('/:id').delete(SMS.delete).patch(SMS.update);

router.get('/user/:id', SMS.getById);

export default router;
