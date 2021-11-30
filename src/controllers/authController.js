const User = require('../models/User');
const CustomError = require('../helpers/errors/CustomError');
const asyncErrorHandler = require('express-async-handler');
const { sendJwtToClint } = require('../helpers/auth/tokenHelpers');
const sendEmail = require('../helpers/email/sendEmail');
const {
  validateUserInput,
  comparePassword,
} = require('../helpers/input/inputsHelper');

const register = asyncErrorHandler(async (req, res, next) => {
  const data = req.body;

  const user = await User.create({ ...data });
  sendJwtToClint(user, res);
});

const login = asyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!validateUserInput(email, password)) {
    return next(new CustomError('Please check your input', 400));
  }

  const user = await User.findOne({ email }).select('+password');

  if (!comparePassword(password, user.password)) {
    return next(new CustomError('Please check your credentials', 400));
  }

  sendJwtToClint(user, res);
});

const logout = asyncErrorHandler((req, res, next) => {
  return res
    .status(200)
    .cookie({
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: 'Logout Successfull',
    });
});

const imageUpload = asyncErrorHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user.id,
    {
      profileImage: req.savedProfileImage,
    },
    { new: true, runValidators: true }
  );

  return res.status(200).json({
    success: true,
    message: 'Image Upload Successful',
    data: user,
  });
});

const forgotPassword = asyncErrorHandler(async (req, res, next) => {
  const resetEmail = req.body.email;
  const { SYSTEM_URL, SMTP_USER } = process.env;

  const user = await User.findOne({ email: resetEmail });

  if (!user) {
    return next(new CustomError('There is no user with that email', 400));
  }

  const resetPasswordToken = user.getResetPasswordTokenFromUser();

  await user.save();

  const resetPasswordUrl = `${SYSTEM_URL}/api/auth/resetpassword?resetPasswordToken=${resetPasswordToken}`;

  const emailTemplate = `
    <h3>Your Password<h3>
    <p> This <a href= '${resetPasswordUrl}' target=_blank> Link </a> will expirein 1 hour </p>
  `;

  try {
    sendEmail({
      from: SMTP_USER,
      to: resetEmail,
      subject: 'Reset Your Password',
      html: emailTemplate,
    });

    return res.status(200).json({
      success: true,
      message: 'Token send to your email',
    });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    return next(new CustomError('Email could not be send', 500));
  }
});

const resetPassword = asyncErrorHandler(async (req, res, next) => {
  const { resetPasswordToken } = req.query;
  const { password } = req.body;

  if (!resetPasswordToken) {
    return next(new CustomError('Please provide a valid token', 400));
  }

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new CustomError('Invalid Token or Session Expired', 404));
  }

  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  return res.status(200).json({
    success: true,
    message: 'Reset Password Process Successful',
  });
});

const editDetails = asyncErrorHandler(async (req, res, next) => {
  const editInformation = req.body;

  const user = await User.findByIdAndUpdate(req.user.id, editInformation, {
    new: true,
    runValidators: true,
  });

  return res.status(200).json({
    success: true,
    data: user,
  });
});

module.exports = {
  register,
  login,
  logout,
  imageUpload,
  forgotPassword,
  resetPassword,
  editDetails,
};
