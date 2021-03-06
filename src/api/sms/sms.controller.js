import Response from '../../utils/response';
import { SmsRouter } from '../config';
import CreateLog from '../../features/logs/logs.util';

const SMSController = {
	send: async (req, res) => {
		const { senderId, userId, dlr, dlrUrl } = req.profile;
		const { from, to, content } = req.body;
		const reqData = { from: from || senderId, to, content, dlr, 'dlr-url':dlrUrl };
		try {
			const { data } = await SmsRouter.post(`/send`, reqData);
			const smsId = data.data.split(' ')[1].replace('"', '');
			await CreateLog('sms', userId, to, from, smsId);
			return Response(res, 200, 'SMS successfully sent', { SenderId: from, to, smsId });
		} catch (error) {
			return res.status(422).send(error);
		}
	},

	batchSend: async (req, res) => {
		try {
			const resp = await SmsRouter.post(`/sendbatch`, req.body);
			return Response(res, 200, 'Messages successfully sent', resp.data);
		} catch (error) {
			console.log(error.response);
			return res.status(422).send(error.response.data);
		}
	},
};

export default SMSController;
