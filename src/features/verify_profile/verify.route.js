import express from 'express';
import Verify from './verify.modal';
import User from '../auth/user.modal';
import Token from '../../utils/generateToken';
const router = express.Router();

router.post('/', (req, res) => {
  if (!req.body.message || !req.body.message.match('{code}')) {
    return res.status(400).send({
      status: 400,
      message: 'make sure {code} exists in your message template',
    });
  }
  req.body.userId = req.user._id;
  Verify.create(req.body, (err, verifyData) => {
    if (err) {
      return res.status(400).send({ message: 'profile creation failed', err });
    }
    return res.status(200).send({
      status: 200,
      data: verifyData,
    });
  });
});

router.get('/', (req, res) => {
  Verify.find({ userId: req.user._id }, (err, verifyData) => {
    if (err) {
      return res.status(400).send({ message: 'profile creation failed', err });
    }
    return res.status(200).send({
      status: 200,
      data: verifyData,
    });
  });
});

router
  .route('/:id')
  .delete((req, res) => {
    Verify.remove(
      { userId: req.user._id, _id: req.params.id },
      (err, { deletedCount }) => {
        if (!deletedCount) {
          return res.status(404).send({
            status: 404,
            message: `profile doesn't exist`,
          });
        }
        return res.status(200).send({
          status: 200,
          data: 'profile deleted successfully',
        });
      }
    );
  })
  .patch((req, res) => {
    Verify.updateOne(
      { userId: req.user._id, _id: req.params.id },
      { ...req.body },
      (err, { nModified }) => {
        if (!nModified) {
          return res.status(404).send({
            status: 404,
            message: `profile doesn't exist`,
          });
        }
        return res.status(200).send({
          status: 200,
          data: 'profile updated successfully',
        });
      }
    );
  });

router.get('/user/:id', (req, res) => {
  Verify.find({}, (err, profiles) => {
    if (err) {
      res.status(400).send({ message: 'Create user failed', err });
    }
    res.status(200).send({
      status: 200,
      data: profiles,
    });
  });
});

export default router;
