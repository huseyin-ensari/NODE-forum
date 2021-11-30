const User = require('../models/User');
const CustomError = require('../helpers/errors/CustomError');
const asyncErrorHandler = require('express-async-handler');

const blockUser = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id);
  user.blocked = !user.blocked;

  await user.save();

  return res.status(200).json({
    success: true,
    message: 'Block - Unblock successful',
  });
});

const deleteUser = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id);
  await user.remove();

  return res.status(200).json({
    success: true,
    message: 'Delete operation successful',
  });
});

module.exports = {
  blockUser,
  deleteUser,
};
