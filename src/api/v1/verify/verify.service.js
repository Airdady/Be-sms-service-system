import Payment from "./payment.modal";
import Response from "../../utils/response";
import Router from '../../config'

const optService = {
    generate: (req, res) => {
        Router.get('/OtpApi/otpgenerate?')
      },
  verify: (req, res) => {
    Router.get('/')
  },
};

export default optService;