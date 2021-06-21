import express from 'express';
import Wallet from './wallet.model';

const router = express.Router();

router.get('/balance', (req, res) => {
  Wallet.findOne({ userId: req.user._id }, (err, balance) => {
    if (err) {
      return res.status(400).send({ message: 'balance fetch failed', err });
    }
    return res.status(200).send({
      status: 200,
      data: balance,
    });
  });
});

export default router;
