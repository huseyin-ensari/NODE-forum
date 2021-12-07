const User = require('../models/User');
const CustomError = require('../helpers/errors/CustomError');
const asyncErrorHandler = require('express-async-handler');

const getSingleUser = asyncErrorHandler(async (req, res, next) => {
  return res.status(200).json({
    success: true,
    data: req.data,
  });
});

const getAllUser = asyncErrorHandler(async (req, res, next) => {
  return res.status(200).json(res.queryResults);
});

module.exports = {
  getSingleUser,
  getAllUser,
};
