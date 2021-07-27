import Payment from "./payment.modal";
import Response from "../../utils/response";
import AddCredit from '../wallet/add.credit.util';

const paymentController = {
  capturePayment: (req, res) => {
    return Payment.create({ ...req.body, userId: req.user._id }, async (err, data) => {
      if (err) return Response(res, 400, "Create user failed", err);
      const wallet = await AddCredit(req.user._id,req.body.amount);
      return Response(res, 201, "payment captured successful", {data, wallet });
    });
  },

  getAllPayment: (req, res) => {
    return Payment.find({}, (err, data) => {
      if (err) return Response(res, 400, "Create user failed", err);
      return Response(res, 200, "", data);
    });
  },
};

export default paymentController;
