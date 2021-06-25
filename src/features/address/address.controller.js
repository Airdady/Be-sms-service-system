import Address from "./address.model";
import Rsp from '../../utils/response';

const addressProfile = {
    getAll: (req, res) => {
        Address.find({ userId: req.user._id }, (err, address) => {
            return err ? Rsp(res, 422, 'address view failed') : Rsp(res, 200, undefined, address);
        });
    },
    create: (req, res) => {
        req.body.userId = req.user._id;
        Address.create(req.body, (err, data) => {
            if (err) return Rsp(res, 400, 'address creation failed');
            return Rsp(res, 200, 'address created successfully', data);
        });
    },
    update: (req, res) => {
		Address.updateOne({ userId: req.user._id, _id: req.params.id }, { ...req.body }, (err, { nModified }) => {
			return !nModified ? Rsp(res, 404, `address doesn't exist`) : Rsp(res, 200, `profile updated successfully`);
		});
	},
    delete: (req, res) => {
		Address.deleteOne({ userId: req.user._id, _id: req.params.id }, (err, { deletedCount }) => {
			return !deletedCount ? Rsp(res, 404, `address doesn't exist`) : Rsp(res, 200, `address deleted successfully`);
		});
	}
}

export default addressProfile