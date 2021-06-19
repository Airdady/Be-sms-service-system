import express from 'express';
import Verify from './verify.modal';
import User from '../auth/user.modal';
import vController from './verify.controller';
const router = express.Router();

router.post('/', vController.create);
router.get('/', vController.getAll);
router.route('/:id').delete(vController.delete).patch(vController.updateOne);

export default router;