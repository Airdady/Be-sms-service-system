import Sms from './sms.modal'
import Response from '../../utils/response'

const smsController = {
    createProfile: (req, res) => {
        req.body.userId = req.user._id;
        Sms.create(req.body, (err, verifyData) => {
          if (err) {
            return Response(res, 400, { message: 'profile creation failed', err })
          }
          return Response(res, 201, {
            status: 201,
            data: verifyData,
          })
        });
      },
    getSms: (req, res) => {
      Sms.find({ userId: req.user._id }, (err, smsData) => {
        if (err) {
          return Response(res, 400, { message: 'failed loading messages', err })
        }
        return Response(res, 200, {
          status: 200,
          data: smsData,
        });
      });
    },
    deleteSms: (req, res) => {
      Sms.remove(
        { userId: req.user._id, _id: req.params.id },
        (err, { deletedCount }) => {
          if (!deletedCount) {
            return Response(res, 404, {
              status: 404,
              message: `profile doesn't exist`,
            })
          }
          return Response(res, 200, {
            status: 200,
            data: "profile deleted successfully",
          })
        }
      );
    },
    updateSms:(req, res) => {
      Sms.updateOne(
        { userId: req.user._id, _id: req.params.id },
        { ...req.body },
        (err, { nModified }) => {
          console.log(nModified);
          if (!nModified) {
            return Response(res, 404, {
              status: 404,
              message: `profile doesn't exist`,
            })
          }
          return Response(res, 200, {
            status: 200,
            data: 'profile updated successfully',
          })
        }
      );
    },
    getSmsById: (req, res) => {
      Sms.find({ userId: req.user._id, _id: req.params.id }, (err, profiles) => {
        if (err) {
          return Response(res, 400, { message: 'Error occured', err })
        }
        return Response(res, 200, {
          status: 200,
          data: profiles,
        })
      });
    }
}

export default smsController