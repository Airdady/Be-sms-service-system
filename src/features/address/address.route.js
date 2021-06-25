import express from 'express';
import Address from './address.controller';

const router = express.Router();

router.route('/').get(Address.getAll).post(Address.create);

router.route('/:id').delete(Address.delete).patch(Address.update);

export default router;
