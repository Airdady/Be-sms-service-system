import Wallet  from "./wallet.model";
import Response from '../../utils/response'

const walletDetails = {
    getBalance: (req, res) => {
        Wallet.findOne({ userId: req.user._id }, (err, balance) => {
            if (err) {
              return Response(res, 400, 'balance fetch failed', err.message)
            }
            return Response(res, 200, '', balance)
          });
    }
}

export default walletDetails