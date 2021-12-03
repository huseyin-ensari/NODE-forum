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

module.exports = {
  addAnswer,
};
