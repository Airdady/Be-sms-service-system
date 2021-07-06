import express from 'express';
import Logs from '../logs/logs.model';
import _ from 'lodash';
import moment from 'moment';
import Res from '../../utils/response';

const router = express.Router();

router.get('/', (req, res) => {
	Logs.find({ userId: req.user._id }, (error, data) => {
		if (error) return Res(res, 422, 'error while retrieving stats');
		const count = _.groupBy(data, (b) => moment(b.createdAt).format('YYYY-MM-DD'))
		
		return Res(res,200,'',Object.values(count).map((value) => {
			const sms =  value.filter((data) => data.serviceType === 'sms');
			const verify = value.filter((data) => data.serviceType === 'verify');
			return {date: moment(value[0].createdAt).format("MMM Do YY"), sms:sms ? sms.length : 0, verify: verify ? verify.length : 0};
		}));
	});
});
 
export default router;
