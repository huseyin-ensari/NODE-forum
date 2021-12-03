const asyncErrorHandler = require('express-async-handler');
const User = require('../../models/User');
const Question = require('../../models/Question');
const Answer = require('../../models/Answer');
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

const checkQuestionExist = asyncErrorHandler(async (req, res, next) => {
  const id = req.params.id || req.params.questionID;

  const question = await Question.findById(id);

  if (!question) {
    return next(new CustomError('There is no such question with that id', 400));
  }

  next();
});

const checkQuestionAndAnswerExist = asyncErrorHandler(
  async (req, res, next) => {
    const { questionID } = req.params;
    const { answerID } = req.params;

    const answer = await Answer.findOne({
      _id: answerID,
      question: questionID,
    });

    if (!answer) {
      return next(
        new CustomError(
          'There is no answer with that id associated with question id',
          400
        )
      );
    }

    next();
  }
);

module.exports = {
  checkUserExist,
  checkQuestionExist,
  checkQuestionAndAnswerExist,
};
