import Response from '../../../utils/response';
import Otp from '../../../features/verify/verify.modal';
import Router from '../config';
import { verifyErrorsHelper, errorsHelper } from './verify.util';
import jwt from 'jsonwebtoken';
import parsePhoneNumber from 'libphonenumber-js';
import client from 'airdady';

const optMiddleware = {
  generateOtp: async (req, res) => {
    const phoneNumber = parsePhoneNumber('758307272', 'UG');
    console.log(phoneNumber.isValid());
    const { senderName, msg, expiry } = req.service;
    const sender_id = senderName;
    const mobile = req.params.msisdn;
    const message = decodeURI(msg).replace('%m', '{code}');
    const reqData = { mobile, sender_id, message, expiry };
    try {
      const { data } = await Router.post(`verifier/send`, reqData);
      return res.status(200).send(data);
    } catch (error) {
      return res.status(200).send(error);
    }
  },

  verifyOtp: async (req, res) => {
    const {
      params: { otp_id, otp_code },
    } = req;
    try {
      const response = await Router.post(`/verifier/verify`, {
        otp_id,
        otp_code,
      });
      return res.status(200).send(response.data);
    } catch (error) {
      console.log(error);
      return res.status(422).send(error.response.data);
    }
  },

  resendOtp: async (req, res) => {
    const {
      params: { otp_id },
    } = req;
    try {
      const response = await Router.post(`/verifier/resend`, { otp_id });
      return res.status(200).send(response.data);
    } catch (error) {
      console.log(error);
      return res.status(422).send(error.response.data);
    }
  },
  test: async (req, res) => {
    client.otp
      .keys('AC.a1dad8f6.09ff.40ed.bf04.6d8c6d975722')
      .generate({ to: '256758307272' })
      .then((response) => res.send(response.data))
      .catch((error) => res.send(error.response));
  },
};

export default optMiddleware;
