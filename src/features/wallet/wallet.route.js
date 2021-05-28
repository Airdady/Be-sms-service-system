import express from 'express';
import Wallet from './wallet.model';

const router = express.Router();

router.get('/balance', (req, res) => {
  Wallet.find({ userId: req.user._id }, (err, smsData) => {
    if (err) {
      return res.status(400).send({ message: 'profile creation failed', err });
    }
    return res.status(200).send({
      status: 200,
      data: smsData,
    });
  });
});

export default router;
