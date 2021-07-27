import Wallet from './wallet.model';

const addCredit = (userId, amount) => {
	return Wallet.findOne({ userId }, (err, wallet) => {
        return Wallet.updateOne({ userId }, { balance: parseInt(wallet.balance) + parseInt(amount) }, (err, { nModified }) => {
			return Wallet.findOne({ userId }, (err, wallet) => {
                return { balance: wallet.balance };
            })
		});
	});
};

export default addCredit;
