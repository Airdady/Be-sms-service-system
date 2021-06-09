import express from 'express';
import Logs from '../logs/logs.model';
import _ from 'lodash';
import moment from 'moment';

const router = express.Router();

router.get('/', (req, res) => {
	Logs.find({ userId: req.user._id }, (error, data) => {
		res.send({ data:_.groupBy(data, (b)=> moment(b.createdAt).format("YYYY-MM-DD")) });
	});
});

export default router;
