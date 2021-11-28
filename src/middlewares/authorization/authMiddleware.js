const CustomError = require('../../helpers/errors/CustomError');
const jwt = require('jsonwebtoken');
const {
  isTokenIncluded,
  getAccessTokenFromHeader,
} = require('../../helpers/auth/tokenHelpers');

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

module.exports = { getAccessToRoute };
