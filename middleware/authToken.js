const jwt = require('jsonwebtoken');
const config = require('config');

const authToken = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'unauthorized' });
  }

  const [_, token] = authorization.split(' ');
  const { userId } = await jwt.verify(token, config.get('secret'));

  req.userId = userId;
  next();
};

module.exports = { authToken };
