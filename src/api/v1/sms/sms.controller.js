import Response from '../../../utils/response';
import { SmsRouter } from '../config';

const SMSController = {
  send: async (req, res) => {
    const { senderId, dlr, dlrUrl } = req.profile;
    const { from, to, content } = req.body;
    const reqData = { from: from || senderId, to, content, dlr, dlrUrl };
    try {
      const { data } = await SmsRouter.post(`/send`, reqData);
      return Response(res, 200, '', data);
    } catch (error) {
      return res.status(422).send(error);
    }
  },

  batchSend: async (req, res) => {
    try {       
      const resp = await SmsRouter.post(`/send_batch`, req.body);
      return Response(res, 200, '', resp.data);
    } catch (error) {
      console.log(error.response);
      return res.status(422).send(error.response.data);
    }
  },
};

export default SMSController;
