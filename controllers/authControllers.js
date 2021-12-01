const bcrypt = require('bcrypt');
const UserSchema = require('../db/UserModel');
const UserModel = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const config = require('config');

const registrationController = async (req, res) => {
  const { password, email } = req.body;

  const [isEmail] = await UserModel.findEmail(email);
  if (isEmail.length) {
    return res
      .status(202)
      .json({ message: 'user already exists', email: "user's already exist" });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const data = { ...req.body, password: hashedPassword };

  try {
    const createdUser = new UserModel({ ...data });
    await createdUser.save();
  } catch (e) {
    return res.status(400).json({ message: e });
  }

  res.status(201).json({
    massage: 'success',
    data,
  });
};

const loginController = async (req, res) => {
  const { email, password } = req.body;

  const [isUser] = await UserModel.findEmail(email);

  if (!isUser.length) {
    return res.status(202).json({ message: 'credentials are incorrect' });
  }

  const user = isUser[0];

  const isEqual = await bcrypt.compare(password, user.password);

  if (!isEqual) {
    return res.status(202).json({ message: 'credentials are incorrect' });
  }

  const token = await jwt.sign({ userId: user.id }, config.get('secret'));

  res.status(200).json({ message: 'success', token, userId: user.id });
};

module.exports = { registrationController, loginController };
