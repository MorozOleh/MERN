const { Schema, model, Types } = require('mongoose');

const Post = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  userId: {
    type: Types.ObjectId,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model('PostModel', Post);
