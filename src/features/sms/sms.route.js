import express from 'express';
import Sms from './sms.modal';

const router = express.Router();

router.post('/', (req, res) => {
  req.body.userId = req.user._id;
  Sms.create(req.body, (err, verifyData) => {
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
  Sms.find({ userId: req.user._id }, (err, smsData) => {
    if (err) {
      return res.status(400).send({ message: 'profile creation failed', err });
    }
    return res.status(200).send({
      status: 200,
      data: smsData,
    });
  });
});

router
  .route('/:id')
  .delete((req, res) => {
    Sms.remove(
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
    Sms.updateOne(
      { userId: req.user._id, _id: req.params.id },
      { ...req.body },
      (err, { nModified }) => {
        console.log(nModified);
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
  Sms.find({}, (err, profiles) => {
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
