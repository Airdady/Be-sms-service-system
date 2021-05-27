import User from './user.modal';
import AuthUtil from './auth.util';
import Response from '../../utils/response';
import bcrypt from 'bcrypt';

const userController = {
  login: (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email }, (err, user) => {
      if (!user) return Response(res, 401, 'user does not exist');
      if (AuthUtil.comparePassword(password, user.password)) {
        user.password = undefined;
        const token = AuthUtil.createToken({
          _id: user._id,
          email: user.email,
        });
        return Response(res, 200, 'login successful', { user, token });
      }
      return Response(res, 401, 'Invalid login details');
    });
  },
  register: (req, res) => {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(req.body.password, salt, (err, password) => {
        User.create({ ...req.body, password }, (err, user) => {
          if (err) {
            return res.status(400).send({ message: 'Create user failed', err });
          }
          return res.status(200).send({
            status: 200,
            message: 'registration successful',
            data: user,
          });
        });
      });
    });
  },
};

export default userController;
