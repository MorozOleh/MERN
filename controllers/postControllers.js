const PostModel = require('../db/PostModel');

const addPostController = async (req, res) => {
  const { title, description } = req.body;
  const { userId } = req;

  const post = await new PostModel({
    title,
    description,
    userId,
  });

  await post.save();

  res.status(201).json(post);
};

const getPostsController = async (req, res) => {
  const { userId } = req;

  const posts = await PostModel.find({ userId }).select({
    __v: 0,
    createdAt: 0,
  });

  res.status(200).json(posts);
};

const getPostController = async (req, res) => {
  const { id } = req.params;

  const post = await PostModel.findById(id).select({
    __v: 0,
    createdAt: 0,
  });

  res.status(200).json(post);
};

module.exports = { addPostController, getPostsController, getPostController };
