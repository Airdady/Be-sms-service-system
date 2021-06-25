import express from 'express';
import Wallet from './wallet.controller';

const router = express.Router();

router.route('/balance').get(Wallet.getBalance);

export default router;
