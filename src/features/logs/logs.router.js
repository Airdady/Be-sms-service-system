import express from 'express';
import Logs from './logs.contoller'

const router = express.Router();

router.route('/').get(Logs.get).post(Logs.create)
router.route('/:id').patch(Logs.update).delete(Logs.delete)

export default router;