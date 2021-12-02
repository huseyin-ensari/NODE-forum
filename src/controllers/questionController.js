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

const getSingleQuestion = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  const question = await Question.findById(id);

  return res.status(200).json({
    success: true,
    data: question,
  });
});

const editQuestion = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  const { title, content } = req.body;

  const question = await Question.findById(id);
  question.title = title;
  question.content = content;

  question.save();

  return res.status(200).json({
    success: true,
    data: question,
  });
});

const deleteQuestion = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;

  await Question.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    message: 'Question delete operation successful',
  });
});

module.exports = {
  askNewQuestion,
  getAllQuestion,
  getSingleQuestion,
  editQuestion,
  deleteQuestion,
};
