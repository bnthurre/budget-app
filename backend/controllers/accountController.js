const Account = require('../models/account');
const { validationResult } = require('express-validator'); // For input validation (optional)

exports.createAccount = async (req, res) => {
  // Validate input using express-validator (optional)
  console.log("in the account create file",req.body)
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }
//create account 
  const newAccount = new Account(req.body);
  try {
    const account_number = await Account.find({account_number : req.body.account_number})
    if(account_number){
      return res.status(404).json({message: "account number already exists", status: false})
    }
    const savedAccount = await newAccount.save();
    res.status(201).json({savedAccount,status: true});
  } catch (err) {
    res.status(400).json({ message: err.message, statu: false });
  }
};


//retreive accounts
exports.getAccounts = async (req, res) => {
  try {
    const accounts = await Account.find();
    res.status(200).json(accounts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//retrieve one account by id
exports.getAccountById = async (req, res) => {
  const id = req.params.id;
  try {
    const account = await Account.findById(id);
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }
    res.status(200).json(account);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// edit account by id
exports.updateAccount = async (req, res) => {
  const id = req.params.id;
  // Validate input using express-validator (optional)

  try {
    const updatedAccount = await Account.findByIdAndUpdate(id, req.body, { new: true }); // Returns updated document
    if (!updatedAccount) {
      return res.status(404).json({ message: 'Account not found' });
    }
    res.status(200).json(updatedAccount);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//delete account by id
exports.deleteAccount = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedAccount = await Account.findByIdAndDelete(id);
    if (!deletedAccount) {
      return res.status(404).json({ message: 'Account not found' });
    }
    res.status(200).json({ message: 'Account deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete multiple accounts by their IDs
exports.deleteAccounts = async (req, res) => {
  const { accountIds } = req.body; // Array of account IDs to delete
  try {
    // Delete multiple accounts using the array of IDs
    await Account.deleteMany({ _id: { $in: accountIds } });
    res.status(200).json({ message: 'Accounts deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};