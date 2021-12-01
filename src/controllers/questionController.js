const Question = require('../models/Question');
const CustomError = require('../helpers/errors/CustomError');
const asyncErrorHandler = require('express-async-handler');

const askNewQuestion = asyncErrorHandler(async (req, res, next) => {
  const question = await Question.create({
    ...req.body,
    user: req.user.id,
  });

  res.status(200).json({
    success: true,
    data: question,
  });
});

const getAllQuestion = asyncErrorHandler(async (req, res, next) => {
  const questions = await Question.find();

  return res.status(200).json({
    success: true,
    data: questions,
  });
});

module.exports = {
  askNewQuestion,
  getAllQuestion,
};
