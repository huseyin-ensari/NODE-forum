const jwt = require('jsonwebtoken');
const asyncErrorHandler = require('express-async-handler');
const CustomError = require('../../helpers/errors/CustomError');
const {
  isTokenIncluded,
  getAccessTokenFromHeader,
} = require('../../helpers/auth/tokenHelpers');
const User = require('../../models/User');
const Question = require('../../models/Question');

const getAccessToRoute = (req, res, next) => {
  const { JWT_SECRET } = process.env;
  if (!isTokenIncluded(req)) {
    return next(new CustomError('You have not access token', 401));
  }

  const access_token = getAccessTokenFromHeader(req);

  jwt.verify(access_token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return next(
        new CustomError('You are not authorized to access this route', 401)
      );
    }

    req.user = {
      id: decoded.id,
      name: decoded.name,
    };

    next();
  });
};

const getAdminAccess = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.user;
  const user = await User.findById(id);

  if (user.role !== 'admin') {
    return next(new CustomError('Only admins can access this route', 403));
  }

  next();
});

const getQuestionOwnerAccess = asyncErrorHandler(async (req, res, next) => {
  const userID = req.user.id;
  const questionID = req.params.id;

  const question = await Question.findById(questionID);

  if (question.user != userID) {
    return next(new CustomError('Only owner can handle this operation', 403));
  }

  next();
});

module.exports = {
  getAccessToRoute,
  getAdminAccess,
  getQuestionOwnerAccess,
};
