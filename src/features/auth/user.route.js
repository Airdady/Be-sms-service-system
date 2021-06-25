import express from 'express';
import User from './user.modal';
import UserController from './user.controller';
import passport from 'passport';
import AuthUtil from './auth.util';
import AuthMiddleware from './auth.middleware';

const router = express.Router();

router.get('/users', (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      res.status(400).send({ message: 'Create user failed', err });
    }
    res.status(200).send({
      status: 200,
      data: users,
    });
  });
});

router.get('/users/:id', (req, res) => {
  User.findOne({ _id: req.params.id }, (err, user) => {
    if (err) {
      return res.status(400).send({ message: 'Create user failed', err });
    }
    res.status(200).send({
      status: 200,
      data: user,
    });
  });
});

router.post('/', AuthMiddleware.validateEmail, UserController.register);
router.post('/login', UserController.login);
//google routes
router.get('/google',passport.authenticate('google',{ scope:['profile','email']}))
router.get('/google/redirect', passport.authenticate('google'), (req, res)=>{
  console.log(req.user)
  const token = AuthUtil.createToken({
    _id: req.user._id,
    email:req.user.email,
})
console.log(token)
  res.send(token)
})

router.get('/users/confirm/:token', AuthMiddleware.verifyToken, UserController.confirmUser);
router.post('/password_reset', UserController.resetPassword);
router.post('/password_reset/:token', AuthMiddleware.verifyToken, UserController.setNewPassword);

export default router;
