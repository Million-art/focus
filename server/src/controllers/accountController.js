const Account = require('../model/Account');

const accountController = {
  unlockAccount: async (req, res) => {
    const { email } = req.body;
    console.log(email)

    try {
      await Account.unlockAccount(email);
      res.status(200).json({ message: 'Account unlocked successfully' });
    } catch (err) {
      console.error('Error unlocking account:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};

module.exports = accountController;
