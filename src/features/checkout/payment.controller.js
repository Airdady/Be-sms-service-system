import Payment from "./payment.modal";
import Response from "../../utils/response";

const paymentController = {
  capturePayment: (req, res) => {
    Payment.create({ ...req.body, userId: req.user._id }, (err, data) => {
      if (err) return Response(res, 400, "Create user failed", err);
      return Response(res, 201, "payment captured successful", data);
    });
  },

  getAllPayment: (req, res) => {
    Payment.find({}, (err, data) => {
      if (err) return Response(res, 400, "Create user failed", err);
      return Response(res, 200, "", data);
    });
  },
};

export default paymentController;
