const { container } = require('../loaders/container.loader');
const { verifyToken } = require('../utils/auth.util');
const { ApiError, catchAsync } = require('../utils/error_handler.util');

const authenticate = catchAsync(async (req, res, next) => {
  const bearerToken = req.headers.authorization;

  if (!bearerToken || !bearerToken.startsWith('Bearer ')) {
    throw ApiError.notAuthenticated();
  }

  const [, token] = bearerToken.split(' ');

  if (!token) {
    throw ApiError.notAuthenticated();
  }

  const decoded = await verifyToken(token);

  const { userId } = decoded;

  const userRepository = container.resolve('userRepository');

  const user = await userRepository.getUserById(userId);

  if (!user || !user.isActive) {
    throw ApiError.notAuthenticated();
  }

  req.user = user;

  next();
});

module.exports = { authenticate };
