import express from 'express';
import Logs from '../logs/logs.model';

const router = express.Router();

router.get('/', (req, res) => {
    console.log(req.user._id);
	Logs.find({ userId: req.user._id }, (error, data) => {
		return res.send({ data });
	});
});

export default router;