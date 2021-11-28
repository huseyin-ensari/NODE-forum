const asyncErrorHandler = require('express-async-handler');
const User = require('../../models/User');
const CustomError = require('../../helpers/errors/CustomError');

const checkUserExist = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id);
  if (!user) {
    return next(new CustomError('There is no such user with that id', 400));
  }

  req.data = user;
  next();
});

module.exports = {
  checkUserExist,
};
