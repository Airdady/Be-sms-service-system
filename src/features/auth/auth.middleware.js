import AuthUtil from './auth.util';
import User from './user.modal';
import Response from '../../utils/response';
import Verify from '../verify/verify.modal';
import Wallet from '../wallet/wallet.model';

const authMiddleware = {
  verifyToken: (req, res, next) => {
    const token = AuthUtil.getToken(req);
    const { error, user } = AuthUtil.verifyToken(token);
    error && Response(res, 401, error.message.replace('session', 'token'));
    req.user = user;
    return next();
  },

  findUser: async (req, res, next) => {
    User.findOne({ email: req.user.email }, (err, user) => {
      if (err) return Response({ message: 'user does not exist', err });
      return next();
    });
  },

  getServiceTokenDetails: async (req, res, next) => {
    Verify.findOne({ serviceToken: req.query.keys }, (err, service) => {
      if (err) return Response(res, 422, 'something went wrong');
      if (!service) return Response(res, 404, 'Invalid service keys');
      req.service = service;
      return next();
    });
  },

  checkServiceCredit: async (req, res, next) => {
    Wallet.findOne({ userId: req.service.userId }, (err, wallet) => {
      if (err) return Response(res, 422, 'error occurred while getting wallet balance info');
      if (!wallet) return Response(res, 404, 'error occurred while getting wallet balance info');
      if (wallet.balance > 10) return Response(res, 401, 'low credit to complete the operation');
      return next();
    });
  },
};

export default authMiddleware;
