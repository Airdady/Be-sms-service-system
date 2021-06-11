import express from 'express';
import Logs from '../logs/logs.model';
import _ from 'lodash';
import moment from 'moment';
import Res from '../../utils/response';

const router = express.Router();

router.get('/', (req, res) => {
	Logs.find({ userId: req.user._id }, (error, data) => {
		if (error) return Res(res, 422, 'error while retrieving stats');
		return Res(res,200,'', _.groupBy(data, (b) => moment(b.createdAt).format('YYYY-MM-DD')));
	});
});

export default router;
