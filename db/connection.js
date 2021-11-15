const config = require('config');
const mongoose = require('mongoose');

const connect = async () => {
  await mongoose.connect(config.get('mongoDB'));
};

module.exports = { connect };
