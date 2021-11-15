const express = require('express');
const { authToken } = require('../middleware/authToken');

const {
  addPostController,
  getPostsController,
  getPostController,
} = require('../controllers/postControllers');
const router = express.Router();

router.post('/create', authToken, addPostController);

router.get('/', authToken, getPostsController);

router.get('/:id', getPostController);

module.exports = router;
