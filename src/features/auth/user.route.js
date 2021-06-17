import express from 'express';
import User from './user.modal';
import UserController from './user.controller';
import passport from 'passport';

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

router.post('/', UserController.register);
router.post('/login', UserController.login);
//google routes
router.get('/google',passport.authenticate('google',{ scope:['profile']}))
router.get('/google/redirect', passport.authenticate('google'), (req, res)=>{
  res.redirect('/inApp/')
})
//github routes

router.get('/github', passport.authenticate("github", { scope: ["user:email"] }), /// Note the scope here
 
)
router.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/inApp/');
  });


export default router;
