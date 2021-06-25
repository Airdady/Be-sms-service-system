import SMS from './sms.modal';
import Response from '../../utils/response'

const sms = {
	create: (req, res) => {
		req.body.userId = req.user._id;
		SMS.create(req.body, (err, data) => {
			if (err) {
        return Response(res, 400, 'profile creation failed', err.message)
			}
      return Response(res, 200, '', data)
		});
	},
    getAll: (req, res) => {
        SMS.find({ userId: req.user._id }, (err, smsData) => {
            if (err) {
              return Response(res, 400, 'profile view failed', err.message)
            }
            return Response(res, 200, '', smsData)
          });
    },
    delete: (req, res) => {
        SMS.deleteOne(
            { userId: req.user._id, _id: req.params.id },
            (err, { deletedCount }) => {
              if (!deletedCount) {
                return Response(res, 404, `profile doesn't exist`)
              }
              return Response(res, 200,'profile deleted successfully')
            }
          );
    },
    update: (req, res) => {
        SMS.updateOne(
            { userId: req.user._id, _id: req.params.id },
            { ...req.body },
            (err, { nModified }) => {
              console.log(nModified);
              if (!nModified) {
                return Response(res, 404, `profile doesn't exist`)
              }
              return Response(res, 200, 'profile updated successfully')
            }
          );
    },
    getById: (req, res) => {
        SMS.find({userId: req.params.id}, (err, profiles) => {
            if (err) {
              return Response(res, 400, 'Create user failed', err.message)
            }
            return Response(res, 200, '', profiles)
          });
    }
};

export default sms;
