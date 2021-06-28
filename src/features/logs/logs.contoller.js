import Logs from "./logs.model";
import Response from '../../utils/response'

const logsProfile = {
    get: (req, res) => {
        Logs.find({ userId: req.user._id }, (error, data) => {
            if(error) Response(res, 400, 'fail fetching logs', error.message)
            return Response(res, 200,'Got all logs' , data)
        });
    },
    create: (req, res) => {
        Logs.create({...req.body, userId: req.user._id }, (error, data) => {
            if(error) Response(res, 400, 'fail fetching logs', error.message)
            return Response(res, 200, 'Log Created', data)
        })
    },
    delete: (req, res) => {
        Logs.deleteOne(
            { userId: req.user._id, _id: req.params.id },
            (err, { deletedCount }) => {
              if (!deletedCount) {
                return Response(res, 404, `Log doesn't exist`)
              }
              return Response(res, 200,'Log deleted successfully')
            }
          );
    },
    update: (req, res) => {
        Logs.updateOne(
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
    }
}

export default logsProfile