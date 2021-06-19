import express from 'express';
import Address from './address.model';
import Rsp from '../../utils/response';

const router = express.Router();

router.post('/', (req, res) => {
	req.body.userId = req.user._id;
	Address.create(req.body, (err, data) => {
		if (err) return Rsp(res, 400, 'address creation failed');
		return Rsp(res, 200, 'address created successfully', data);
	});
});

router.get('/', (req, res) => {
	Address.find({ userId: req.user._id }, (err, address) => {
		return err ? Rsp(res, 422, 'address view failed') : Rsp(res, 200, undefined, address);
	});
});

router
	.route('/:id')
	.delete((req, res) => {
		Address.remove({ userId: req.user._id, _id: req.params.id }, (err, { deletedCount }) => {
			return !deletedCount ? Rsp(res, 404, `address doesn't exist`) : Rsp(res, 404, `address deleted successfully`);
		});
	})
	.patch((req, res) => {
		Sms.updateOne({ userId: req.user._id, _id: req.params.id }, { ...req.body }, (err, { nModified }) => {
			return !nModified ? Rsp(res, 404, `address doesn't exist`) : Rsp(res, 404, `profile updated successfully`);
		});
	});

export default router;
