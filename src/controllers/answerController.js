const asyncErrorHandler = require('express-async-handler');
const CustomError = require('../helpers/errors/CustomError');
const Question = require('../models/Question');
const Answer = require('../models/Answer');

const addAnswer = asyncErrorHandler(async (req, res, next) => {
  const { questionID } = req.params;
  const userID = req.user.id;

  const answer = await Answer.create({
    ...req.body,
    question: questionID,
    user: userID,
  });

  return res.status(200).json({
    success: true,
    data: answer,
  });
});

const getAllAnswersByQuestion = asyncErrorHandler(async (req, res, next) => {
  const { questionID } = req.params;

  const question = await Question.findById(questionID).populate('answers');
  const answers = question.answers;

  return res.status(200).json({
    success: true,
    count: answers.length,
    data: answers,
  });
});

const getSingleAnswer = asyncErrorHandler(async (req, res, next) => {
  const { answerID } = req.params;

  const answer = await Answer.findById(answerID)
    .populate({
      path: 'question',
      select: 'title',
    })
    .populate({
      path: 'user',
      select: 'name profileImage',
    });

  return res.status(200).json({
    success: true,
    data: answer,
  });
});

const editAnswer = asyncErrorHandler(async (req, res, next) => {
  const { answerID } = req.params;
  const { content } = req.body;

  const answer = await Answer.findById(answerID);
  answer.content = content;
  await answer.save();

  return res.status(200).json({
    success: true,
    data: answer,
  });
});

const deleteAnswer = asyncErrorHandler(async (req, res, next) => {
  const { answerID, questionID } = req.params;

  await Answer.findByIdAndRemove(answerID);

  const question = await Question.findById(questionID);
  question.answers.splice(question.answers.indexOf(answerID), 1);
  question.answerCount = question.answers.length;
  await question.save();

  return res.status(200).json({
    success: true,
    message: 'Answer delete operation successful',
  });
});

const likeAnswer = asyncErrorHandler(async (req, res, next) => {
  const { answerID } = req.params;

  const answer = await Answer.findById(answerID);

  if (answer.likes.includes(req.user.id)) {
    return next(new CustomError('You already liked this answer', 400));
  }

  answer.likes.push(req.user.id);
  await answer.save();

  res.status(200).json({
    success: true,
    data: answer,
  });
});

const undoLikeAnswer = asyncErrorHandler(async (req, res, next) => {
  const { answerID } = req.params;

  const answer = await Answer.findById(answerID);

  if (!answer.likes.includes(req.user.id)) {
    return next(
      new CustomerError('You can not undo like operation for this answer', 400)
    );
  }

  const index = answer.likes.indexOf(req.user.id);
  answer.likes.splice(index, 1);
  await answer.save();

  res.status(200).json({
    success: true,
    data: answer,
  });
});

module.exports = {
  addAnswer,
  getAllAnswersByQuestion,
  getSingleAnswer,
  editAnswer,
  deleteAnswer,
  likeAnswer,
  undoLikeAnswer,
};
